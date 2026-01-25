import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import {
	customerFields,
	customerOperations,
} from './descriptions/CustomerDescription';

import {
	ticketFields,
	ticketOperations,
} from './descriptions/TicketDescription';

import {
	invoiceFields,
	invoiceOperations,
} from './descriptions/InvoiceDescription';

import {
	leadFields,
	leadOperations,
} from './descriptions/LeadDescription';

import {
	projectFields,
	projectOperations,
} from './descriptions/ProjectDescription';

import {
	contractFields,
	contractOperations,
} from './descriptions/ContractDescription';

export class PerfexCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PerfexCRM',
		name: 'perfexCrm',
		icon: 'file:perfexcrm.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with PerfexCRM API',
		defaults: {
			name: 'PerfexCRM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'perfexCrmApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Ticket',
						value: 'ticket',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Contract',
						value: 'contract',
					},
				],
				default: 'customer',
			},
			...customerOperations,
			...customerFields,
			...ticketOperations,
			...ticketFields,
			...invoiceOperations,
			...invoiceFields,
			...leadOperations,
			...leadFields,
			...projectOperations,
			...projectFields,
			...contractOperations,
			...contractFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('perfexCrmApi');
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		let responseData;
		const baseUrl = credentials.baseUrl as string;
		const apiVersion = credentials.apiVersion as string;
		const apiKey = credentials.apiKey as string;
		// Configurable page size - PerfexCRM default is 25, max is 100
		// Can be overridden via PERFEXCRM_PAGE_SIZE env var
		const pageSize = Math.min(
			parseInt(process.env.PERFEXCRM_PAGE_SIZE || '25', 10),
			100 // PerfexCRM max limit
		);

		// Headers with API key for authentication
		const headers = {
			'X-API-KEY': apiKey,
		};

		// Helper function for standardized response data extraction
		const extractResponseData = (response: any): any => {
			// Handle various response formats from PerfexCRM API
			if (response === null || response === undefined) {
				return null;
			}
			// If response has a data property, extract it
			if (typeof response === 'object' && 'data' in response) {
				return response.data;
			}
			// Return response as-is if no data wrapper
			return response;
		};

		// Helper function for API requests with rate limit retry
		const makeRequestWithRetry = async (
			options: any,
			maxRetries: number = 3
		): Promise<any> => {
			let lastError: any;
			for (let attempt = 0; attempt < maxRetries; attempt++) {
				try {
					return await this.helpers.request(options);
				} catch (error: any) {
					lastError = error;
					// Check for rate limit (429 Too Many Requests)
					const statusCode = error.statusCode || error.response?.statusCode;
					if (statusCode === 429) {
						// Get retry delay from Retry-After header or default to 60 seconds
						const retryAfter = error.response?.headers?.['retry-after'] ||
							error.response?.body?.retry_after ||
							60;
						const delayMs = (parseInt(retryAfter, 10) || 60) * 1000;

						// Only retry if not the last attempt
						if (attempt < maxRetries - 1) {
							console.warn(`Rate limited. Retrying after ${retryAfter} seconds (attempt ${attempt + 1}/${maxRetries})`);
							await new Promise(resolve => setTimeout(resolve, delayMs));
							continue;
						}
					}
					// Not a rate limit error or last retry, throw
					throw error;
				}
			}
			throw lastError;
		};

		// Helper function for paginated requests
		// PerfexCRM API uses page/limit pagination (not offset/limit)
		const fetchAllPaginated = async (
			url: string,
			qs: Record<string, any>,
			returnAll: boolean,
			userLimit: number,
			userOffset: number = 0,
		): Promise<any[]> => {
			const allData: any[] = [];
			let currentPage = 1;
			const apiLimit = Math.min(pageSize, 100); // PerfexCRM caps at 100

			// Helper to extract data array from response
			const extractData = (response: any): any[] => {
				if (Array.isArray(response)) {
					return response;
				} else if (response && Array.isArray(response.data)) {
					return response.data;
				} else if (response && typeof response === 'object') {
					// Some endpoints return object with different keys
					const possibleArrayKeys = ['invoices', 'customers', 'tickets', 'leads', 'projects', 'contracts', 'items', 'results'];
					const arrayKey = possibleArrayKeys.find(key => Array.isArray(response[key]));
					return arrayKey ? response[arrayKey] : [];
				}
				return [];
			};

			if (returnAll) {
				// Fetch all records using page/limit pagination
				while (true) {
					const response = await makeRequestWithRetry({
						method: 'GET',
						url,
						qs: { ...qs, page: currentPage, limit: apiLimit },
						json: true,
						headers,
					});

					const data = extractData(response);

					if (data.length === 0) {
						break;
					}

					allData.push(...data);

					// If we got less than requested, we've reached the end
					if (data.length < apiLimit) {
						break;
					}

					currentPage++;
				}
			} else {
				// Fetch with user-specified limit and offset
				// Convert offset to page number: page = floor(offset / limit) + 1
				const startPage = Math.floor(userOffset / apiLimit) + 1;
				const skipInFirstPage = userOffset % apiLimit;
				let itemsNeeded = userLimit;
				let isFirstPage = true;
				currentPage = startPage;

				while (itemsNeeded > 0) {
					const response = await makeRequestWithRetry({
						method: 'GET',
						url,
						qs: { ...qs, page: currentPage, limit: apiLimit },
						json: true,
						headers,
					});

					let data = extractData(response);

					if (data.length === 0) {
						break;
					}

					// Skip items in first page if offset doesn't align with page boundary
					if (isFirstPage && skipInFirstPage > 0) {
						data = data.slice(skipInFirstPage);
						isFirstPage = false;
					}

					// Take only what we need
					const itemsToTake = Math.min(data.length, itemsNeeded);
					allData.push(...data.slice(0, itemsToTake));
					itemsNeeded -= itemsToTake;

					// If we got less than apiLimit, we've reached the end
					if (data.length < apiLimit) {
						break;
					}

					currentPage++;
				}
			}

			return allData;
		};

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'customer') {
					if (operation === 'create') {
						const company = this.getNodeParameter('company', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);
						
						const body: any = {
							company,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/customers`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/customers`,
							filters,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);
						
						const body = updateFields;
						
						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getContacts') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/contacts`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getContracts') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/contracts`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getInvoices') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/invoices`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getProjects') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/projects`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getTickets') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/tickets`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					}
				} else if (resource === 'ticket') {
					if (operation === 'create') {
						const subject = this.getNodeParameter('subject', i) as string;
						const department = this.getNodeParameter('department', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);
						
						const body: any = {
							subject,
							department,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tickets`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const options = this.getNodeParameter('options', i);
						
						const qs: any = {};
						if (options.includeReplies) {
							qs.include = 'replies';
						}
						
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}`,
							qs,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						// Build query string with filters
						const qs: Record<string, any> = {};
						if (filters.status) qs.status = filters.status;
						if (filters.department) qs.department = filters.department;
						if (filters.priority) qs.priority = filters.priority;

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/tickets`,
							qs,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body = updateFields;
						
						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						
						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}`,
							json: true,
							headers,
						});
					} else if (operation === 'addReply') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);

						const body: any = {
							message,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'getReply') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const replyId = this.getNodeParameter('replyId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies/${replyId}`,
							json: true,
							headers,
						});
					} else if (operation === 'updateReply') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const replyId = this.getNodeParameter('replyId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies/${replyId}`,
							body: updateFields,
							json: true,
							headers,
						});
					} else if (operation === 'deleteReply') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const replyId = this.getNodeParameter('replyId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies/${replyId}`,
							json: true,
							headers,
						});
					} else if (operation === 'listReplies') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getAttachments') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/attachments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getHistory') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/history`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'assign') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const staffId = this.getNodeParameter('staffId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/assign`,
							body: { staff_id: staffId },
							json: true,
							headers,
						});
					} else if (operation === 'changeStatus') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const status = this.getNodeParameter('status', i) as number;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/status`,
							body: { status },
							json: true,
							headers,
						});
					}
				} else if (resource === 'invoice') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const number = this.getNodeParameter('number', i) as string;
						const date = this.getNodeParameter('date', i) as string;
						const duedate = this.getNodeParameter('duedate', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);

						const body: any = {
							clientid: clientId,
							number,
							date,
							duedate,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/invoices`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/invoices/${invoiceId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/invoices`,
							filters,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/invoices/${invoiceId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/invoices/${invoiceId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getPayments') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/invoices/${invoiceId}/payments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'send') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;

						const body: any = {};
						if (additionalFields.cc) {
							body.cc = additionalFields.cc;
						}
						if (additionalFields.template) {
							body.template = additionalFields.template;
						}

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/invoices/${invoiceId}/send`,
							body,
							json: true,
							headers,
						});
					}
				} else if (resource === 'lead') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);
						
						const body: any = {
							name,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/leads`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const leadId = this.getNodeParameter('leadId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/leads`,
							filters,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const leadId = this.getNodeParameter('leadId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const leadId = this.getNodeParameter('leadId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}`,
							json: true,
							headers,
						});
					} else if (operation === 'convert') {
						const leadId = this.getNodeParameter('leadId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}/convert`,
							json: true,
							headers,
						});
					} else if (operation === 'getActivities') {
						const leadId = this.getNodeParameter('leadId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}/activities`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getNotes') {
						const leadId = this.getNodeParameter('leadId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}/notes`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					}
				} else if (resource === 'project') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const clientId = this.getNodeParameter('clientId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);

						const body: any = {
							name,
							clientid: clientId,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/projects`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const projectId = this.getNodeParameter('projectId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/projects`,
							filters,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const projectId = this.getNodeParameter('projectId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const projectId = this.getNodeParameter('projectId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getActivity') {
						const projectId = this.getNodeParameter('projectId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}/activity`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getFiles') {
						const projectId = this.getNodeParameter('projectId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}/files`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getMilestones') {
						const projectId = this.getNodeParameter('projectId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}/milestones`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getTasks') {
						const projectId = this.getNodeParameter('projectId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}/tasks`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					}
				} else if (resource === 'contract') {
					if (operation === 'create') {
						const subject = this.getNodeParameter('subject', i) as string;
						const client = this.getNodeParameter('client', i) as string;
						const datestart = this.getNodeParameter('datestart', i) as string;
						const dateend = this.getNodeParameter('dateend', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);

						const body: any = {
							subject,
							client,
							datestart,
							dateend,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/contracts`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const contractId = this.getNodeParameter('contractId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/contracts`,
							filters,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const contractId = this.getNodeParameter('contractId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const contractId = this.getNodeParameter('contractId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}`,
							json: true,
							headers,
						});
					} else if (operation === 'sign') {
						const contractId = this.getNodeParameter('contractId', i) as string;
						const signature = this.getNodeParameter('signature', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);

						const body: any = {
							signature,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}/sign`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'getAttachments') {
						const contractId = this.getNodeParameter('contractId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}/attachments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getComments') {
						const contractId = this.getNodeParameter('contractId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}/comments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getExpired') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/contracts/expired`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getExpiring') {
						const days = this.getNodeParameter('days', i, 30) as number;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/contracts/expiring`,
							qs: { days },
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'renew') {
						const contractId = this.getNodeParameter('contractId', i) as string;
						const newEndDate = this.getNodeParameter('newEndDate', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;

						const body: any = {
							dateend: newEndDate,
						};

						if (additionalFields.new_start_date) {
							body.datestart = additionalFields.new_start_date;
						}
						if (additionalFields.new_value) {
							body.contract_value = additionalFields.new_value;
						}

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}/renew`,
							body,
							json: true,
							headers,
						});
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map((item) => ({ json: item })));
				} else {
					returnData.push({ json: responseData });
				}
			} catch (error: any) {
				// Enhanced error handling with HTTP status codes and context
				const errorDetails: Record<string, any> = {
					resource,
					operation,
					itemIndex: i,
				};

				// Extract detailed error information
				let errorBody: any = null;
				let statusCode: number | undefined;
				let errorMessage = error.message || 'Unknown error';

				if (error.response) {
					// HTTP error with response
					statusCode = error.response.statusCode || error.statusCode;
					errorDetails.statusCode = statusCode;
					errorDetails.statusMessage = error.response.statusMessage;
					errorBody = error.response.body;
					errorDetails.body = errorBody;

					// Try to extract error message from response body
					if (errorBody) {
						if (typeof errorBody === 'string') {
							try {
								const parsed = JSON.parse(errorBody);
								errorMessage = parsed.message || parsed.error || parsed.status_message || errorBody;
							} catch {
								errorMessage = errorBody;
							}
						} else if (typeof errorBody === 'object') {
							errorMessage = errorBody.message || errorBody.error || errorBody.status_message || JSON.stringify(errorBody);
						}
					}
				} else if (error.statusCode) {
					statusCode = error.statusCode;
					errorDetails.statusCode = statusCode;
				}

				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: errorMessage,
							...errorDetails,
						},
					});
					continue;
				}

				// Throw a more descriptive error using n8n's error types
				if (error.response || error.statusCode) {
					throw new NodeApiError(this.getNode(), error, {
						message: `PerfexCRM API error on ${resource}/${operation}: ${errorMessage}`,
						description: `HTTP ${statusCode || 'unknown'}: ${errorMessage}`,
						httpCode: String(statusCode || 'unknown'),
					});
				}

				throw new NodeOperationError(
					this.getNode(),
					`Error in ${resource}/${operation}: ${errorMessage}`,
					{ itemIndex: i }
				);
			}
		}

		return [returnData];
	}
}