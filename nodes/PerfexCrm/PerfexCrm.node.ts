import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import {
	validateAndFormatDate,
	validateEmail,
	validateNonNegativeNumber,
	validateNumericId,
	validateAndFormatDateFields,
	validateEmailFields,
	validateNonNegativeFields,
} from './helpers/validation';

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

import {
	taskFields,
	taskOperations,
} from './descriptions/TaskDescription';

import {
	expenseFields,
	expenseOperations,
} from './descriptions/ExpenseDescription';

import {
	estimateFields,
	estimateOperations,
} from './descriptions/EstimateDescription';

import {
	staffFields,
	staffOperations,
} from './descriptions/StaffDescription';

import {
	proposalFields,
	proposalOperations,
} from './descriptions/ProposalDescription';

import {
	creditNoteFields,
	creditNoteOperations,
} from './descriptions/CreditNoteDescription';

import {
	subscriptionFields,
	subscriptionOperations,
} from './descriptions/SubscriptionDescription';

import {
	itemFields,
	itemOperations,
} from './descriptions/ItemDescription';

import {
	utilityFields,
	utilityOperations,
} from './descriptions/UtilityDescription';

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
					{
						name: 'Estimate',
						value: 'estimate',
					},
					{
						name: 'Expense',
						value: 'expense',
					},
					{
						name: 'Proposal',
						value: 'proposal',
					},
					{
						name: 'Staff',
						value: 'staff',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Credit Note',
						value: 'creditNote',
					},
					{
						name: 'Item',
						value: 'item',
					},
					{
						name: 'Subscription',
						value: 'subscription',
					},
					{
						name: 'Utility',
						value: 'utility',
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
			...taskOperations,
			...taskFields,
			...expenseOperations,
			...expenseFields,
			...estimateOperations,
			...estimateFields,
			...staffOperations,
			...staffFields,
			...proposalOperations,
			...proposalFields,
			...creditNoteOperations,
			...creditNoteFields,
			...subscriptionOperations,
			...subscriptionFields,
			...itemOperations,
			...itemFields,
			...utilityOperations,
			...utilityFields,
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
					const possibleArrayKeys = ['invoices', 'customers', 'tickets', 'leads', 'projects', 'contracts', 'tasks', 'expenses', 'estimates', 'staff', 'proposals', 'items', 'credit_notes', 'subscriptions', 'results'];
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
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate email if provided
						validateEmailFields(this.getNode(), additionalFields, ['email'], i);

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
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate email if provided
						validateEmailFields(this.getNode(), updateFields, ['email'], i);

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
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate email if provided
						validateEmailFields(this.getNode(), additionalFields, ['email'], i);

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
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate email if provided
						validateEmailFields(this.getNode(), additionalFields, ['email'], i);

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
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate and normalize dates
						const normalizedDate = validateAndFormatDate(this.getNode(), date, 'Date', i);
						const normalizedDueDate = validateAndFormatDate(this.getNode(), duedate, 'Due Date', i);

						// Validate monetary fields
						validateNonNegativeFields(this.getNode(), additionalFields, ['total', 'subtotal'], i);

						const body: any = {
							clientid: clientId,
							number,
							date: normalizedDate,
							duedate: normalizedDueDate,
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
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), updateFields, ['date', 'duedate'], i);

						// Validate monetary fields
						validateNonNegativeFields(this.getNode(), updateFields, ['total', 'subtotal'], i);

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
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate email and lead value if provided
						validateEmailFields(this.getNode(), additionalFields, ['email'], i);
						validateNonNegativeFields(this.getNode(), additionalFields, ['lead_value'], i);

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
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate email and lead value if provided
						validateEmailFields(this.getNode(), updateFields, ['email'], i);
						validateNonNegativeFields(this.getNode(), updateFields, ['lead_value'], i);

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
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), additionalFields, ['start_date', 'deadline'], i);

						// Validate monetary/numeric fields
						validateNonNegativeFields(this.getNode(), additionalFields, ['project_cost', 'project_rate_per_hour', 'estimated_hours'], i);

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
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), updateFields, ['start_date', 'deadline'], i);

						// Validate monetary/numeric fields
						validateNonNegativeFields(this.getNode(), updateFields, ['project_cost', 'project_rate_per_hour', 'estimated_hours'], i);

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
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate and normalize dates
						const normalizedStart = validateAndFormatDate(this.getNode(), datestart, 'Start Date', i);
						const normalizedEnd = validateAndFormatDate(this.getNode(), dateend, 'End Date', i);

						// Validate monetary fields
						validateNonNegativeFields(this.getNode(), additionalFields, ['contract_value'], i);

						const body: any = {
							subject,
							client,
							datestart: normalizedStart,
							dateend: normalizedEnd,
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
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), updateFields, ['datestart', 'dateend'], i);

						// Validate monetary fields
						validateNonNegativeFields(this.getNode(), updateFields, ['contract_value'], i);

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
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate signer email if provided
						validateEmailFields(this.getNode(), additionalFields, ['signer_email'], i);

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
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate and normalize dates
						const normalizedEndDate = validateAndFormatDate(this.getNode(), newEndDate, 'New End Date', i);

						// Validate new_start_date and new_value if provided
						validateAndFormatDateFields(this.getNode(), additionalFields, ['new_start_date'], i);
						validateNonNegativeFields(this.getNode(), additionalFields, ['new_value'], i);

						const body: any = {
							dateend: normalizedEndDate,
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
				} else if (resource === 'expense') {
					if (operation === 'create') {
						const category = this.getNodeParameter('category', i) as string;
						const amount = this.getNodeParameter('amount', i) as number;
						const date = this.getNodeParameter('date', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate and normalize date
						const normalizedDate = validateAndFormatDate(this.getNode(), date, 'Date', i);

						// Validate non-negative fields
						validateNonNegativeFields(this.getNode(), additionalFields, ['tax', 'tax2'], i);

						const body: any = {
							category,
							amount,
							date: normalizedDate,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/expenses`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const expenseId = this.getNodeParameter('expenseId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/expenses/${expenseId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						// Build query string from filters
						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value === '' || value === undefined || value === null) continue;
							qs[key] = value;
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/expenses`,
							qs,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const expenseId = this.getNodeParameter('expenseId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), updateFields, ['date'], i);

						// Validate non-negative fields
						validateNonNegativeFields(this.getNode(), updateFields, ['amount', 'tax', 'tax2'], i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/expenses/${expenseId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const expenseId = this.getNodeParameter('expenseId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/expenses/${expenseId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getCategories') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/expenses/categories`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					}
				} else if (resource === 'estimate') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const date = this.getNodeParameter('date', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate and normalize date
						const normalizedDate = validateAndFormatDate(this.getNode(), date, 'Date', i);

						// Validate optional date and monetary fields
						validateAndFormatDateFields(this.getNode(), additionalFields, ['expirydate'], i);
						validateNonNegativeFields(this.getNode(), additionalFields, ['adjustment', 'discount_percent', 'discount_total'], i);

						const body: any = {
							clientid: clientId,
							date: normalizedDate,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/estimates`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const estimateId = this.getNodeParameter('estimateId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/estimates/${estimateId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						// Build query string, normalize date filters
						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value === '' || value === undefined || value === null) continue;
							if (['date_from', 'date_to', 'expiry_from', 'expiry_to'].includes(key) && typeof value === 'string') {
								qs[key] = validateAndFormatDate(this.getNode(), value, key, i);
							} else {
								qs[key] = value;
							}
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/estimates`,
							qs,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const estimateId = this.getNodeParameter('estimateId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), updateFields, ['date', 'expirydate'], i);

						// Validate monetary fields
						validateNonNegativeFields(this.getNode(), updateFields, ['adjustment', 'discount_percent', 'discount_total'], i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/estimates/${estimateId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const estimateId = this.getNodeParameter('estimateId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/estimates/${estimateId}`,
							json: true,
							headers,
						});
					} else if (operation === 'send') {
						const estimateId = this.getNodeParameter('estimateId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/estimates/${estimateId}/send`,
							json: true,
							headers,
						});
					} else if (operation === 'convert') {
						const estimateId = this.getNodeParameter('estimateId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						const body: any = {
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/estimates/${estimateId}/convert`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'getPdf') {
						const estimateId = this.getNodeParameter('estimateId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/estimates/${estimateId}/pdf`,
							json: true,
							headers,
						});
					}
				} else if (resource === 'staff') {
					if (operation === 'create') {
						const firstName = this.getNodeParameter('firstName', i) as string;
						const lastName = this.getNodeParameter('lastName', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const password = this.getNodeParameter('password', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate email
						validateEmail(this.getNode(), email, 'Email', i);

						// Validate non-negative fields
						validateNonNegativeFields(this.getNode(), additionalFields, ['hourly_rate'], i);

						const body: any = {
							firstname: firstName,
							lastname: lastName,
							email,
							password,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/staff`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const staffId = this.getNodeParameter('staffId', i) as string;
						const options = this.getNodeParameter('options', i) as Record<string, boolean>;

						// Build include query parameter from individual booleans
						const includes: string[] = [];
						if (options.includeDepartments) includes.push('departments');
						if (options.includePermissions) includes.push('permissions');

						const qs: any = {};
						if (includes.length > 0) {
							qs.include = includes.join(',');
						}

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/staff/${staffId}`,
							qs,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						// Build query string from filters
						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value === '' || value === undefined || value === null) continue;
							qs[key] = value;
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/staff`,
							qs,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const staffId = this.getNodeParameter('staffId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate email if provided
						validateEmailFields(this.getNode(), updateFields, ['email'], i);

						// Validate non-negative fields
						validateNonNegativeFields(this.getNode(), updateFields, ['hourly_rate'], i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/staff/${staffId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const staffId = this.getNodeParameter('staffId', i) as string;
						const transferDataTo = this.getNodeParameter('transferDataTo', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/staff/${staffId}`,
							qs: { transfer_data_to: transferDataTo },
							json: true,
							headers,
						});
					} else if (operation === 'activate') {
						const staffId = this.getNodeParameter('staffId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/staff/${staffId}/activate`,
							json: true,
							headers,
						});
					} else if (operation === 'deactivate') {
						const staffId = this.getNodeParameter('staffId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/staff/${staffId}/deactivate`,
							json: true,
							headers,
						});
					} else if (operation === 'getPermissions') {
						const staffId = this.getNodeParameter('staffId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/staff/${staffId}/permissions`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getDepartments') {
						const staffId = this.getNodeParameter('staffId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/staff/${staffId}/departments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getRoles') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/staff/roles`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getDepartmentList') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/staff/departments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'changePassword') {
						const staffId = this.getNodeParameter('staffId', i) as string;
						const newPassword = this.getNodeParameter('newPassword', i) as string;
						const confirmPassword = this.getNodeParameter('confirmPassword', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/staff/${staffId}/change-password`,
							body: { new_password: newPassword, confirm_password: confirmPassword },
							json: true,
							headers,
						});
					} else if (operation === 'getTasks') {
						const staffId = this.getNodeParameter('staffId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);

						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value !== '' && value !== undefined) qs[key] = value;
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/staff/${staffId}/tasks`,
							qs,
							returnAll,
							limit,
							0,
						);
					} else if (operation === 'getTimesheets') {
						const staffId = this.getNodeParameter('staffId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);

						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value !== '' && value !== undefined) qs[key] = value;
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/staff/${staffId}/timesheets`,
							qs,
							returnAll,
							limit,
							0,
						);
					}
				} else if (resource === 'proposal') {
					if (operation === 'create') {
						const subject = this.getNodeParameter('subject', i) as string;
						const date = this.getNodeParameter('date', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate and normalize date
						const normalizedDate = validateAndFormatDate(this.getNode(), date, 'Date', i);

						// Validate optional date and monetary fields
						validateAndFormatDateFields(this.getNode(), additionalFields, ['open_till'], i);
						validateNonNegativeFields(this.getNode(), additionalFields, ['adjustment', 'discount_percent', 'discount_total'], i);

						// Validate email if provided
						validateEmailFields(this.getNode(), additionalFields, ['email'], i);

						const body: any = {
							subject,
							date: normalizedDate,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/proposals`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const proposalId = this.getNodeParameter('proposalId', i) as string;
						const options = this.getNodeParameter('options', i) as Record<string, boolean>;

						const qs: any = {};
						if (options.includeComments) {
							qs.include = 'comments';
						}

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/proposals/${proposalId}`,
							qs,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						// Build query string, normalize date filters
						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value === '' || value === undefined || value === null) continue;
							if (['date_from', 'date_to', 'open_till_from', 'open_till_to'].includes(key) && typeof value === 'string') {
								qs[key] = validateAndFormatDate(this.getNode(), value, key, i);
							} else {
								qs[key] = value;
							}
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/proposals`,
							qs,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const proposalId = this.getNodeParameter('proposalId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), updateFields, ['date', 'open_till'], i);

						// Validate monetary fields
						validateNonNegativeFields(this.getNode(), updateFields, ['adjustment', 'discount_percent', 'discount_total'], i);

						// Validate email if provided
						validateEmailFields(this.getNode(), updateFields, ['email'], i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/proposals/${proposalId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const proposalId = this.getNodeParameter('proposalId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/proposals/${proposalId}`,
							json: true,
							headers,
						});
					} else if (operation === 'send') {
						const proposalId = this.getNodeParameter('proposalId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;

						const body: any = {};
						if (additionalFields.cc) {
							body.cc = additionalFields.cc;
						}
						if (additionalFields.attach_pdf !== undefined) {
							body.attach_pdf = additionalFields.attach_pdf;
						}

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/proposals/${proposalId}/send`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'accept') {
						const proposalId = this.getNodeParameter('proposalId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/proposals/${proposalId}/accept`,
							json: true,
							headers,
						});
					} else if (operation === 'decline') {
						const proposalId = this.getNodeParameter('proposalId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/proposals/${proposalId}/decline`,
							json: true,
							headers,
						});
					} else if (operation === 'listComments') {
						const proposalId = this.getNodeParameter('proposalId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/proposals/${proposalId}/comments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'addComment') {
						const proposalId = this.getNodeParameter('proposalId', i) as string;
						const content = this.getNodeParameter('content', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/proposals/${proposalId}/comments`,
							body: { content },
							json: true,
							headers,
						});
					} else if (operation === 'getPdf') {
						const proposalId = this.getNodeParameter('proposalId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/proposals/${proposalId}/pdf`,
							json: true,
							headers,
						});
					}
				} else if (resource === 'task') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const startdate = this.getNodeParameter('startdate', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate and normalize start date
						const normalizedStartDate = validateAndFormatDate(this.getNode(), startdate, 'Start Date', i);

						// Validate optional date and numeric fields
						validateAndFormatDateFields(this.getNode(), additionalFields, ['duedate'], i);
						validateNonNegativeFields(this.getNode(), additionalFields, ['hourly_rate'], i);

						// Handle assignees: convert comma-separated string to array
						let assignees: number[] | undefined;
						if (additionalFields.assignees && typeof additionalFields.assignees === 'string') {
							assignees = (additionalFields.assignees as string)
								.split(',')
								.map((s: string) => parseInt(s.trim(), 10))
								.filter((n: number) => !isNaN(n));
							delete additionalFields.assignees;
						}

						const body: any = {
							name,
							startdate: normalizedStartDate,
							...additionalFields,
						};

						if (assignees && assignees.length > 0) {
							body.assignees = assignees;
						}

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tasks`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const options = this.getNodeParameter('options', i) as Record<string, boolean>;

						// Build include query parameter from individual booleans
						const includes: string[] = [];
						if (options.includeComments) includes.push('comments');
						if (options.includeTimesheets) includes.push('timesheets');
						if (options.includeChecklist) includes.push('checklist');
						if (options.includeAssignees) includes.push('assignees');

						const qs: any = {};
						if (includes.length > 0) {
							qs.include = includes.join(',');
						}

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}`,
							qs,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						// Build query string, normalize date filters
						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value === '' || value === undefined || value === null) continue;
							// Normalize date filter values
							if (['startdate_from', 'startdate_to', 'duedate_from', 'duedate_to'].includes(key) && typeof value === 'string') {
								qs[key] = validateAndFormatDate(this.getNode(), value, key, i);
							} else {
								qs[key] = value;
							}
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/tasks`,
							qs,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), updateFields, ['startdate', 'duedate'], i);

						// Validate numeric fields
						validateNonNegativeFields(this.getNode(), updateFields, ['hourly_rate'], i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const taskId = this.getNodeParameter('taskId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}`,
							json: true,
							headers,
						});
					} else if (operation === 'assign') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const staffId = this.getNodeParameter('staffId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/assign`,
							body: { staff_id: staffId },
							json: true,
							headers,
						});
					} else if (operation === 'changeStatus') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const status = this.getNodeParameter('status', i) as number;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/status`,
							body: { status },
							json: true,
							headers,
						});
					} else if (operation === 'markComplete') {
						const taskId = this.getNodeParameter('taskId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/mark-complete`,
							json: true,
							headers,
						});
					} else if (operation === 'getAttachments') {
						const taskId = this.getNodeParameter('taskId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/attachments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'listComments') {
						const taskId = this.getNodeParameter('taskId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/comments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'addComment') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const content = this.getNodeParameter('content', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/comments`,
							body: { content },
							json: true,
							headers,
						});
					} else if (operation === 'listTimesheets') {
						const taskId = this.getNodeParameter('taskId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/timesheets`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'addTimesheet') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const startTime = this.getNodeParameter('startTime', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate hourly_rate if provided
						validateNonNegativeFields(this.getNode(), additionalFields, ['hourly_rate'], i);

						const body: any = {
							start_time: startTime,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/timesheets`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'listChecklist') {
						const taskId = this.getNodeParameter('taskId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/checklist`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'addChecklistItem') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						const body: any = {
							description,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/checklist`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'getChecklistItem') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const checklistItemId = this.getNodeParameter('checklistItemId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/checklist/${checklistItemId}`,
							json: true,
							headers,
						});
					} else if (operation === 'updateChecklistItem') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const checklistItemId = this.getNodeParameter('checklistItemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/checklist/${checklistItemId}`,
							body: updateFields,
							json: true,
							headers,
						});
					} else if (operation === 'deleteChecklistItem') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const checklistItemId = this.getNodeParameter('checklistItemId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/checklist/${checklistItemId}`,
							json: true,
							headers,
						});
					} else if (operation === 'changePriority') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const priority = this.getNodeParameter('priority', i) as number;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/priority`,
							body: { priority },
							json: true,
							headers,
						});
					} else if (operation === 'listFollowers') {
						const taskId = this.getNodeParameter('taskId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/followers`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'addFollower') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const staffId = this.getNodeParameter('staffId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/followers`,
							body: { staff_id: staffId },
							json: true,
							headers,
						});
					} else if (operation === 'removeFollower') {
						const taskId = this.getNodeParameter('taskId', i) as string;
						const staffId = this.getNodeParameter('staffId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/tasks/${taskId}/followers/${staffId}`,
							json: true,
							headers,
						});
					}
				} else if (resource === 'creditNote') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const date = this.getNodeParameter('date', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate and normalize date
						const normalizedDate = validateAndFormatDate(this.getNode(), date, 'Date', i);

						// Validate monetary fields
						validateNonNegativeFields(this.getNode(), additionalFields, ['discount_percent', 'discount_total'], i);

						const body: any = {
							clientid: clientId,
							date: normalizedDate,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/credit-notes`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;
						const options = this.getNodeParameter('options', i) as Record<string, any>;

						// Build include query parameter from boolean options
						const includes: string[] = [];
						if (options.includeCredits) includes.push('credits');
						if (options.includeRefunds) includes.push('refunds');

						const qs: Record<string, any> = {};
						if (includes.length > 0) {
							qs.include = includes.join(',');
						}

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/credit-notes/${creditNoteId}`,
							qs,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						// Build query string, normalize date filters
						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value === '' || value === undefined || value === null) continue;
							if (['date_from', 'date_to'].includes(key) && typeof value === 'string') {
								qs[key] = validateAndFormatDate(this.getNode(), value, key, i);
							} else {
								qs[key] = value;
							}
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/credit-notes`,
							qs,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), updateFields, ['date'], i);

						// Validate monetary fields
						validateNonNegativeFields(this.getNode(), updateFields, ['discount_percent', 'discount_total'], i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/credit-notes/${creditNoteId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/credit-notes/${creditNoteId}`,
							json: true,
							headers,
						});
					} else if (operation === 'addRefund') {
						const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;
						const amount = this.getNodeParameter('amount', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate refunded_on date if provided
						validateAndFormatDateFields(this.getNode(), additionalFields, ['refunded_on'], i);

						const body: any = {
							amount,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/credit-notes/${creditNoteId}/refunds`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'listRefunds') {
						const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/credit-notes/${creditNoteId}/refunds`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'applyCredit') {
						const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						const amount = this.getNodeParameter('amount', i) as number;

						const body: any = {
							invoice_id: invoiceId,
							amount,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/credit-notes/${creditNoteId}/credits`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'listCredits') {
						const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/credit-notes/${creditNoteId}/credits`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getPdf') {
						const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/credit-notes/${creditNoteId}/pdf`,
							json: true,
							headers,
						});
					}
				} else if (resource === 'subscription') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const clientId = this.getNodeParameter('clientId', i) as string;
						const currency = this.getNodeParameter('currency', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

						// Validate optional date fields
						validateAndFormatDateFields(this.getNode(), additionalFields, ['date', 'ends_at', 'next_billing_cycle'], i);

						const body: any = {
							name,
							clientid: clientId,
							currency,
							...additionalFields,
						};

						responseData = await makeRequestWithRetry({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/subscriptions`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'get') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as string;
						const options = this.getNodeParameter('options', i) as Record<string, any>;

						// Build include query parameter from boolean options
						const includes: string[] = [];
						if (options.includeInvoices) includes.push('invoices');
						if (options.includeCustomer) includes.push('customer');

						const qs: Record<string, any> = {};
						if (includes.length > 0) {
							qs.include = includes.join(',');
						}

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/subscriptions/${subscriptionId}`,
							qs,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						// Build query string, normalize date filters
						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value === '' || value === undefined || value === null) continue;
							if (['created_from', 'created_to'].includes(key) && typeof value === 'string') {
								qs[key] = validateAndFormatDate(this.getNode(), value, key, i);
							} else {
								qs[key] = value;
							}
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/subscriptions`,
							qs,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'update') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

						// Validate and normalize date fields if provided
						validateAndFormatDateFields(this.getNode(), updateFields, ['date', 'ends_at', 'next_billing_cycle'], i);

						const body = updateFields;

						responseData = await makeRequestWithRetry({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/subscriptions/${subscriptionId}`,
							body,
							json: true,
							headers,
						});
					} else if (operation === 'delete') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/subscriptions/${subscriptionId}`,
							json: true,
							headers,
						});
					}
				} else if (resource === 'item') {
					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/items/${itemId}`,
							json: true,
							headers,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;
						const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
						const offset = returnAll ? 0 : (this.getNodeParameter('offset', i) as number);

						const qs: Record<string, any> = {};
						for (const [key, value] of Object.entries(filters)) {
							if (value === '' || value === undefined || value === null) continue;
							qs[key] = value;
						}

						responseData = await fetchAllPaginated(
							`${baseUrl}/api/${apiVersion}/items`,
							qs,
							returnAll,
							limit,
							offset,
						);
					} else if (operation === 'getGroups') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/item-groups`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					}
				} else if (resource === 'utility') {
					if (operation === 'getCurrencies') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/currencies`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getTaxes') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/taxes`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getDepartments') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/departments`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getPaymentModes') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/payment-modes`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getCountries') {
						const filters = this.getNodeParameter('filters', i) as Record<string, any>;

						const qs: Record<string, any> = {};
						if (filters.search) {
							qs.search = filters.search;
						}

						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/countries`,
							qs,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getTicketStatuses') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/ticket-statuses`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getTicketPriorities') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/ticket-priorities`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getLeadStatuses') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/lead-statuses`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getLeadSources') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/lead-sources`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
					} else if (operation === 'getContractTypes') {
						responseData = await makeRequestWithRetry({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/contract-types`,
							json: true,
							headers,
						});
						responseData = extractResponseData(responseData);
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