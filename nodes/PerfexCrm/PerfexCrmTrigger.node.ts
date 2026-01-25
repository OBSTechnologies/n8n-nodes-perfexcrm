import {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

export class PerfexCrmTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PerfexCRM Trigger',
		name: 'perfexCrmTrigger',
		icon: 'file:perfexcrm.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts workflow when PerfexCRM events occur',
		defaults: {
			name: 'PerfexCRM Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'perfexCrmApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				description: 'The events to listen to',
				options: [
					// Customer Events
					{
						name: 'Customer Created',
						value: 'customer.created',
						description: 'Triggered when a new customer is created',
					},
					{
						name: 'Customer Updated',
						value: 'customer.updated',
						description: 'Triggered when a customer is updated',
					},
					{
						name: 'Customer Deleted',
						value: 'customer.deleted',
						description: 'Triggered when a customer is deleted',
					},
					// Contact Events
					{
						name: 'Contact Created',
						value: 'contact.created',
						description: 'Triggered when a new contact is created',
					},
					{
						name: 'Contact Updated',
						value: 'contact.updated',
						description: 'Triggered when a contact is updated',
					},
					{
						name: 'Contact Deleted',
						value: 'contact.deleted',
						description: 'Triggered when a contact is deleted',
					},
					// Lead Events
					{
						name: 'Lead Created',
						value: 'lead.created',
						description: 'Triggered when a new lead is created',
					},
					{
						name: 'Lead Updated',
						value: 'lead.updated',
						description: 'Triggered when a lead is updated',
					},
					{
						name: 'Lead Converted',
						value: 'lead.converted',
						description: 'Triggered when a lead is converted to customer',
					},
					{
						name: 'Lead Deleted',
						value: 'lead.deleted',
						description: 'Triggered when a lead is deleted',
					},
					// Invoice Events
					{
						name: 'Invoice Created',
						value: 'invoice.created',
						description: 'Triggered when a new invoice is created',
					},
					{
						name: 'Invoice Updated',
						value: 'invoice.updated',
						description: 'Triggered when an invoice is updated',
					},
					{
						name: 'Invoice Paid',
						value: 'invoice.paid',
						description: 'Triggered when an invoice is paid',
					},
					{
						name: 'Invoice Overdue',
						value: 'invoice.overdue',
						description: 'Triggered when an invoice becomes overdue',
					},
					{
						name: 'Invoice Deleted',
						value: 'invoice.deleted',
						description: 'Triggered when an invoice is deleted',
					},
					// Payment Events
					{
						name: 'Payment Recorded',
						value: 'payment.recorded',
						description: 'Triggered when a payment is recorded',
					},
					{
						name: 'Payment Failed',
						value: 'payment.failed',
						description: 'Triggered when a payment fails',
					},
					// Proposal Events
					{
						name: 'Proposal Created',
						value: 'proposal.created',
						description: 'Triggered when a new proposal is created',
					},
					{
						name: 'Proposal Sent',
						value: 'proposal.sent',
						description: 'Triggered when a proposal is sent',
					},
					{
						name: 'Proposal Accepted',
						value: 'proposal.accepted',
						description: 'Triggered when a proposal is accepted',
					},
					{
						name: 'Proposal Declined',
						value: 'proposal.declined',
						description: 'Triggered when a proposal is declined',
					},
					// Estimate Events
					{
						name: 'Estimate Created',
						value: 'estimate.created',
						description: 'Triggered when a new estimate is created',
					},
					{
						name: 'Estimate Sent',
						value: 'estimate.sent',
						description: 'Triggered when an estimate is sent',
					},
					{
						name: 'Estimate Accepted',
						value: 'estimate.accepted',
						description: 'Triggered when an estimate is accepted',
					},
					{
						name: 'Estimate Declined',
						value: 'estimate.declined',
						description: 'Triggered when an estimate is declined',
					},
					{
						name: 'Estimate Converted',
						value: 'estimate.converted',
						description: 'Triggered when an estimate is converted to invoice',
					},
					// Contract Events
					{
						name: 'Contract Created',
						value: 'contract.created',
						description: 'Triggered when a new contract is created',
					},
					{
						name: 'Contract Signed',
						value: 'contract.signed',
						description: 'Triggered when a contract is signed',
					},
					{
						name: 'Contract Expiring',
						value: 'contract.expiring',
						description: 'Triggered when a contract is about to expire',
					},
					{
						name: 'Contract Expired',
						value: 'contract.expired',
						description: 'Triggered when a contract expires',
					},
					// Project Events
					{
						name: 'Project Created',
						value: 'project.created',
						description: 'Triggered when a new project is created',
					},
					{
						name: 'Project Updated',
						value: 'project.updated',
						description: 'Triggered when a project is updated',
					},
					{
						name: 'Project Completed',
						value: 'project.completed',
						description: 'Triggered when a project is marked as complete',
					},
					// Task Events
					{
						name: 'Task Created',
						value: 'task.created',
						description: 'Triggered when a new task is created',
					},
					{
						name: 'Task Updated',
						value: 'task.updated',
						description: 'Triggered when a task is updated',
					},
					{
						name: 'Task Completed',
						value: 'task.completed',
						description: 'Triggered when a task is completed',
					},
					{
						name: 'Task Comment Added',
						value: 'task.comment_added',
						description: 'Triggered when a comment is added to a task',
					},
					// Ticket Events
					{
						name: 'Ticket Created',
						value: 'ticket.created',
						description: 'Triggered when a new ticket is created',
					},
					{
						name: 'Ticket Updated',
						value: 'ticket.updated',
						description: 'Triggered when a ticket is updated',
					},
					{
						name: 'Ticket Status Changed',
						value: 'ticket.status_changed',
						description: 'Triggered when ticket status changes',
					},
					{
						name: 'Ticket Reply Added',
						value: 'ticket.reply_added',
						description: 'Triggered when a reply is added to a ticket',
					},
					{
						name: 'Ticket Assigned',
						value: 'ticket.assigned',
						description: 'Triggered when a ticket is assigned',
					},
					{
						name: 'Ticket Closed',
						value: 'ticket.closed',
						description: 'Triggered when a ticket is closed',
					},
					// Staff Events
					{
						name: 'Staff Created',
						value: 'staff.created',
						description: 'Triggered when a new staff member is created',
					},
					{
						name: 'Staff Login',
						value: 'staff.login',
						description: 'Triggered when a staff member logs in',
					},
					// Expense Events
					{
						name: 'Expense Created',
						value: 'expense.created',
						description: 'Triggered when a new expense is created',
					},
					{
						name: 'Expense Updated',
						value: 'expense.updated',
						description: 'Triggered when an expense is updated',
					},
				],
			},
			{
				displayName: 'Secret',
				name: 'secret',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Optional secret for webhook signature verification',
			},
		],
	};

	// @ts-ignore (because of IWebhookFunctions type)
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const credentials = await this.getCredentials('perfexCrmApi');

				const baseUrl = credentials.baseUrl as string;
				const apiVersion = credentials.apiVersion as string;
				const apiKey = credentials.apiKey as string;

				const headers = {
					'X-API-KEY': apiKey,
				};

				// Check if webhook exists
				if (webhookData.webhookId) {
					try {
						const response = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/${apiVersion}/webhooks/${webhookData.webhookId}`,
							json: true,
							headers,
						});
						
						if (response && response.data) {
							return true;
						}
					} catch (error) {
						// Webhook doesn't exist
					}
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const events = this.getNodeParameter('events') as string[];
				const secret = this.getNodeParameter('secret', '') as string;
				const credentials = await this.getCredentials('perfexCrmApi');

				const baseUrl = credentials.baseUrl as string;
				const apiVersion = credentials.apiVersion as string;
				const apiKey = credentials.apiKey as string;

				const headers = {
					'X-API-KEY': apiKey,
				};

				const body = {
					name: `n8n-webhook-${this.getWorkflow().id}`,
					url: webhookUrl,
					events: events,
					secret: secret || undefined,
					is_active: 1,
				};

				const response = await this.helpers.request({
					method: 'POST',
					url: `${baseUrl}/api/${apiVersion}/webhooks`,
					body,
					json: true,
					headers,
				});

				if (response.data && response.data.id) {
					webhookData.webhookId = response.data.id;
					return true;
				}

				return false;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const credentials = await this.getCredentials('perfexCrmApi');

				if (webhookData.webhookId) {
					const baseUrl = credentials.baseUrl as string;
					const apiVersion = credentials.apiVersion as string;
					const apiKey = credentials.apiKey as string;

					const headers = {
						'X-API-KEY': apiKey,
					};

					try {
						await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/${apiVersion}/webhooks/${webhookData.webhookId}`,
							json: true,
							headers,
						});
					} catch (error) {
						return false;
					}

					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const secret = this.getNodeParameter('secret', '') as string;
		const headers = this.getHeaderData() as IDataObject;

		// Verify webhook signature if secret is configured
		// PerfexCRM uses X-Webhook-Signature header with SHA256 HMAC
		if (secret) {
			// PerfexCRM only uses X-Webhook-Signature header (case-insensitive in n8n)
			const signature = headers['x-webhook-signature'] as string | undefined;

			if (!signature) {
				console.warn('Webhook signature verification failed: X-Webhook-Signature header not found');
				return {
					workflowData: [],
				};
			}

			const crypto = require('crypto');
			// PerfexCRM signs the raw JSON body
			const bodyString = typeof bodyData === 'string' ? bodyData : JSON.stringify(bodyData);

			// Generate expected signature using SHA256 HMAC (PerfexCRM default algorithm)
			const expectedSignature = crypto
				.createHmac('sha256', secret)
				.update(bodyString)
				.digest('hex');

			// Use timing-safe comparison to prevent timing attacks (same as PerfexCRM's hash_equals)
			let isValid = false;
			try {
				isValid = crypto.timingSafeEqual(
					Buffer.from(expectedSignature, 'hex'),
					Buffer.from(signature, 'hex')
				);
			} catch {
				// Buffer lengths don't match or invalid hex
				isValid = false;
			}

			if (!isValid) {
				console.warn('Webhook signature verification failed: Invalid signature');
				return {
					workflowData: [],
				};
			}
		}

		return {
			workflowData: [
				[
					{
						json: bodyData as IDataObject,
						headers,
					},
				],
			],
		};
	}
}