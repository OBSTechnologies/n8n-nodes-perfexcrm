import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
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

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/customers`,
							body,
							json: true,
						});
					} else if (operation === 'get') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}`,
							json: true,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i);
						
						const qs: any = {};
						
						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 1000;
						}
						
						Object.assign(qs, filters);
						
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers`,
							qs,
							json: true,
						});
						
						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'update') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);
						
						const body = updateFields;
						
						responseData = await this.helpers.request({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}`,
							body,
							json: true,
						});
					} else if (operation === 'delete') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}`,
							json: true,
						});
					} else if (operation === 'getContacts') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/contacts`,
							json: true,
						});

						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'getContracts') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/contracts`,
							json: true,
						});

						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'getInvoices') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/invoices`,
							json: true,
						});

						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'getProjects') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/projects`,
							json: true,
						});

						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'getTickets') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/customers/${customerId}/tickets`,
							json: true,
						});

						if (responseData.data) {
							responseData = responseData.data;
						}
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

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tickets`,
							body,
							json: true,
						});
					} else if (operation === 'get') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const options = this.getNodeParameter('options', i);
						
						const qs: any = {};
						if (options.includeReplies) {
							qs.include = 'replies';
						}
						
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}`,
							qs,
							json: true,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i);
						
						const qs: any = {};
						
						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 1000;
						}
						
						// Handle status filter
						if (filters.status) {
							qs.status = filters.status;
						}
						if (filters.department) {
							qs.department = filters.department;
						}
						if (filters.priority) {
							qs.priority = filters.priority;
						}
						
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tickets`,
							qs,
							json: true,
						});
						
						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'update') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);
						
						const body = updateFields;
						
						responseData = await this.helpers.request({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}`,
							body,
							json: true,
						});
					} else if (operation === 'delete') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						
						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}`,
							json: true,
						});
					} else if (operation === 'addReply') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);

						const body: any = {
							message,
							...additionalFields,
						};

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies`,
							body,
							json: true,
						});
					} else if (operation === 'getReply') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const replyId = this.getNodeParameter('replyId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies/${replyId}`,
							json: true,
						});
					} else if (operation === 'updateReply') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const replyId = this.getNodeParameter('replyId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						responseData = await this.helpers.request({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies/${replyId}`,
							body: updateFields,
							json: true,
						});
					} else if (operation === 'deleteReply') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const replyId = this.getNodeParameter('replyId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies/${replyId}`,
							json: true,
						});
					} else if (operation === 'listReplies') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/tickets/${ticketId}/replies`,
							json: true,
						});

						if (responseData.data) {
							responseData = responseData.data;
						}
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

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/invoices`,
							body,
							json: true,
						});
					} else if (operation === 'get') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/invoices/${invoiceId}`,
							json: true,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i);
						
						const qs: any = {};
						
						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 1000;
						}
						
						Object.assign(qs, filters);
						
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/invoices`,
							qs,
							json: true,
						});
						
						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'update') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body = updateFields;

						responseData = await this.helpers.request({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/invoices/${invoiceId}`,
							body,
							json: true,
						});
					} else if (operation === 'delete') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/invoices/${invoiceId}`,
							json: true,
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

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/leads`,
							body,
							json: true,
						});
					} else if (operation === 'get') {
						const leadId = this.getNodeParameter('leadId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}`,
							json: true,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i);

						const qs: any = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 1000;
						}

						Object.assign(qs, filters);

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/leads`,
							qs,
							json: true,
						});

						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'update') {
						const leadId = this.getNodeParameter('leadId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body = updateFields;

						responseData = await this.helpers.request({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}`,
							body,
							json: true,
						});
					} else if (operation === 'delete') {
						const leadId = this.getNodeParameter('leadId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}`,
							json: true,
						});
					} else if (operation === 'convert') {
						const leadId = this.getNodeParameter('leadId', i) as string;
						
						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/leads/${leadId}/convert`,
							json: true,
						});
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

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/projects`,
							body,
							json: true,
						});
					} else if (operation === 'get') {
						const projectId = this.getNodeParameter('projectId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}`,
							json: true,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i);

						const qs: any = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 1000;
						}

						Object.assign(qs, filters);

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/projects`,
							qs,
							json: true,
						});

						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'update') {
						const projectId = this.getNodeParameter('projectId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body = updateFields;

						responseData = await this.helpers.request({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}`,
							body,
							json: true,
						});
					} else if (operation === 'delete') {
						const projectId = this.getNodeParameter('projectId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/projects/${projectId}`,
							json: true,
						});
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

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/contracts`,
							body,
							json: true,
						});
					} else if (operation === 'get') {
						const contractId = this.getNodeParameter('contractId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}`,
							json: true,
						});
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i);

						const qs: any = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						} else {
							qs.limit = 1000;
						}

						Object.assign(qs, filters);

						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/contracts`,
							qs,
							json: true,
						});

						if (responseData.data) {
							responseData = responseData.data;
						}
					} else if (operation === 'update') {
						const contractId = this.getNodeParameter('contractId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body = updateFields;

						responseData = await this.helpers.request({
							method: 'PUT',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}`,
							body,
							json: true,
						});
					} else if (operation === 'delete') {
						const contractId = this.getNodeParameter('contractId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}`,
							json: true,
						});
					} else if (operation === 'sign') {
						const contractId = this.getNodeParameter('contractId', i) as string;
						const signature = this.getNodeParameter('signature', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);

						const body: any = {
							signature,
							...additionalFields,
						};

						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/${apiVersion}/contracts/${contractId}/sign`,
							body,
							json: true,
						});
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map((item) => ({ json: item })));
				} else {
					returnData.push({ json: responseData });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({ json: { error: errorMessage } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}