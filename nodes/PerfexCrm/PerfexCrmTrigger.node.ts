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
					// Contact Events
					{
						name: 'Contact Created',
						value: 'contact.created',
						description: 'Triggered when a new contact is created',
					},
					{
						name: 'Contact Deleted',
						value: 'contact.deleted',
						description: 'Triggered when a contact is deleted',
					},
					{
						name: 'Contact Updated',
						value: 'contact.updated',
						description: 'Triggered when a contact is updated',
					},
					// Contract Events
					{
						name: 'Contract Cancelled',
						value: 'contract.cancelled',
						description: 'Triggered when a contract is cancelled',
					},
					{
						name: 'Contract Created',
						value: 'contract.created',
						description: 'Triggered when a new contract is created',
					},
					{
						name: 'Contract Deleted',
						value: 'contract.deleted',
						description: 'Triggered when a contract is deleted',
					},
					{
						name: 'Contract Expired',
						value: 'contract.expired',
						description: 'Triggered when a contract expires',
					},
					{
						name: 'Contract Expiring',
						value: 'contract.expiring',
						description: 'Triggered when a contract is about to expire',
					},
					{
						name: 'Contract Signed',
						value: 'contract.signed',
						description: 'Triggered when a contract is signed',
					},
					{
						name: 'Contract Updated',
						value: 'contract.updated',
						description: 'Triggered when a contract is updated',
					},
					// Credit Note Events
					{
						name: 'Credit Note Created',
						value: 'credit_note.created',
						description: 'Triggered when a new credit note is created',
					},
					{
						name: 'Credit Note Credits Applied',
						value: 'credit_note.credits_applied',
						description: 'Triggered when credit note credits are applied',
					},
					{
						name: 'Credit Note Deleted',
						value: 'credit_note.deleted',
						description: 'Triggered when a credit note is deleted',
					},
					{
						name: 'Credit Note Refund Created',
						value: 'credit_note.refund_created',
						description: 'Triggered when a credit note refund is created',
					},
					{
						name: 'Credit Note Sent',
						value: 'credit_note.sent',
						description: 'Triggered when a credit note is sent',
					},
					{
						name: 'Credit Note Status Changed',
						value: 'credit_note.status_changed',
						description: 'Triggered when credit note status changes',
					},
					{
						name: 'Credit Note Updated',
						value: 'credit_note.updated',
						description: 'Triggered when a credit note is updated',
					},
					// Customer Events
					{
						name: 'Customer Contact Added',
						value: 'customer.contact_added',
						description: 'Triggered when a contact is added to a customer',
					},
					{
						name: 'Customer Created',
						value: 'customer.created',
						description: 'Triggered when a new customer is created',
					},
					{
						name: 'Customer Deleted',
						value: 'customer.deleted',
						description: 'Triggered when a customer is deleted',
					},
					{
						name: 'Customer Status Changed',
						value: 'customer.status_changed',
						description: 'Triggered when customer status changes',
					},
					{
						name: 'Customer Updated',
						value: 'customer.updated',
						description: 'Triggered when a customer is updated',
					},
					// Estimate Events
					{
						name: 'Estimate Accepted',
						value: 'estimate.accepted',
						description: 'Triggered when an estimate is accepted',
					},
					{
						name: 'Estimate Converted',
						value: 'estimate.converted',
						description: 'Triggered when an estimate is converted to invoice',
					},
					{
						name: 'Estimate Created',
						value: 'estimate.created',
						description: 'Triggered when a new estimate is created',
					},
					{
						name: 'Estimate Declined',
						value: 'estimate.declined',
						description: 'Triggered when an estimate is declined',
					},
					{
						name: 'Estimate Deleted',
						value: 'estimate.deleted',
						description: 'Triggered when an estimate is deleted',
					},
					{
						name: 'Estimate Expiring',
						value: 'estimate.expiring',
						description: 'Triggered when an estimate is about to expire',
					},
					{
						name: 'Estimate Sent',
						value: 'estimate.sent',
						description: 'Triggered when an estimate is sent',
					},
					{
						name: 'Estimate Updated',
						value: 'estimate.updated',
						description: 'Triggered when an estimate is updated',
					},
					// Expense Events
					{
						name: 'Expense Created',
						value: 'expense.created',
						description: 'Triggered when a new expense is created',
					},
					{
						name: 'Expense Deleted',
						value: 'expense.deleted',
						description: 'Triggered when an expense is deleted',
					},
					{
						name: 'Expense Updated',
						value: 'expense.updated',
						description: 'Triggered when an expense is updated',
					},
					// Invoice Events
					{
						name: 'Invoice Cancelled',
						value: 'invoice.cancelled',
						description: 'Triggered when an invoice is cancelled',
					},
					{
						name: 'Invoice Created',
						value: 'invoice.created',
						description: 'Triggered when a new invoice is created',
					},
					{
						name: 'Invoice Deleted',
						value: 'invoice.deleted',
						description: 'Triggered when an invoice is deleted',
					},
					{
						name: 'Invoice Overdue',
						value: 'invoice.overdue',
						description: 'Triggered when an invoice becomes overdue',
					},
					{
						name: 'Invoice Paid',
						value: 'invoice.paid',
						description: 'Triggered when an invoice is paid',
					},
					{
						name: 'Invoice Sent',
						value: 'invoice.sent',
						description: 'Triggered when an invoice is sent',
					},
					{
						name: 'Invoice Status Changed',
						value: 'invoice.status_changed',
						description: 'Triggered when invoice status changes',
					},
					{
						name: 'Invoice Updated',
						value: 'invoice.updated',
						description: 'Triggered when an invoice is updated',
					},
					// Item Events
					{
						name: 'Item Created',
						value: 'item.created',
						description: 'Triggered when a new catalog item is created',
					},
					{
						name: 'Item Deleted',
						value: 'item.deleted',
						description: 'Triggered when a catalog item is deleted',
					},
					{
						name: 'Item Updated',
						value: 'item.updated',
						description: 'Triggered when a catalog item is updated',
					},
					// Lead Events
					{
						name: 'Lead Assigned',
						value: 'lead.assigned',
						description: 'Triggered when a lead is assigned',
					},
					{
						name: 'Lead Converted',
						value: 'lead.converted',
						description: 'Triggered when a lead is converted to customer',
					},
					{
						name: 'Lead Created',
						value: 'lead.created',
						description: 'Triggered when a new lead is created',
					},
					{
						name: 'Lead Status Changed',
						value: 'lead.status_changed',
						description: 'Triggered when lead status changes',
					},
					{
						name: 'Lead Updated',
						value: 'lead.updated',
						description: 'Triggered when a lead is updated',
					},
					// Note Events
					{
						name: 'Note Created',
						value: 'note.created',
						description: 'Triggered when a new note is created',
					},
					{
						name: 'Note Deleted',
						value: 'note.deleted',
						description: 'Triggered when a note is deleted',
					},
					{
						name: 'Note Updated',
						value: 'note.updated',
						description: 'Triggered when a note is updated',
					},
					// Payment Events
					{
						name: 'Payment Created',
						value: 'payment.created',
						description: 'Triggered when a new payment is created',
					},
					{
						name: 'Payment Deleted',
						value: 'payment.deleted',
						description: 'Triggered when a payment is deleted',
					},
					{
						name: 'Payment Updated',
						value: 'payment.updated',
						description: 'Triggered when a payment is updated',
					},
					// Project Events
					{
						name: 'Project Completed',
						value: 'project.completed',
						description: 'Triggered when a project is marked as complete',
					},
					{
						name: 'Project Created',
						value: 'project.created',
						description: 'Triggered when a new project is created',
					},
					{
						name: 'Project Status Changed',
						value: 'project.status_changed',
						description: 'Triggered when project status changes',
					},
					{
						name: 'Project Updated',
						value: 'project.updated',
						description: 'Triggered when a project is updated',
					},
					// Proposal Events
					{
						name: 'Proposal Accepted',
						value: 'proposal.accepted',
						description: 'Triggered when a proposal is accepted',
					},
					{
						name: 'Proposal Comment Added',
						value: 'proposal.comment_added',
						description: 'Triggered when a comment is added to a proposal',
					},
					{
						name: 'Proposal Converted',
						value: 'proposal.converted',
						description: 'Triggered when a proposal is converted',
					},
					{
						name: 'Proposal Created',
						value: 'proposal.created',
						description: 'Triggered when a new proposal is created',
					},
					{
						name: 'Proposal Declined',
						value: 'proposal.declined',
						description: 'Triggered when a proposal is declined',
					},
					{
						name: 'Proposal Deleted',
						value: 'proposal.deleted',
						description: 'Triggered when a proposal is deleted',
					},
					{
						name: 'Proposal Sent',
						value: 'proposal.sent',
						description: 'Triggered when a proposal is sent',
					},
					{
						name: 'Proposal Updated',
						value: 'proposal.updated',
						description: 'Triggered when a proposal is updated',
					},
					// Staff Events
					{
						name: 'Staff Activated',
						value: 'staff.activated',
						description: 'Triggered when a staff member is activated',
					},
					{
						name: 'Staff Created',
						value: 'staff.created',
						description: 'Triggered when a new staff member is created',
					},
					{
						name: 'Staff Deactivated',
						value: 'staff.deactivated',
						description: 'Triggered when a staff member is deactivated',
					},
					{
						name: 'Staff Deleted',
						value: 'staff.deleted',
						description: 'Triggered when a staff member is deleted',
					},
					{
						name: 'Staff Login',
						value: 'staff.login',
						description: 'Triggered when a staff member logs in',
					},
					{
						name: 'Staff Password Changed',
						value: 'staff.password_changed',
						description: 'Triggered when a staff member password is changed',
					},
					{
						name: 'Staff Permissions Changed',
						value: 'staff.permissions_changed',
						description: 'Triggered when staff member permissions are changed',
					},
					{
						name: 'Staff Updated',
						value: 'staff.updated',
						description: 'Triggered when a staff member is updated',
					},
					// Subscription Events
					{
						name: 'Subscription Created',
						value: 'subscription.created',
						description: 'Triggered when a new subscription is created',
					},
					// Task Events
					{
						name: 'Task Assigned',
						value: 'task.assigned',
						description: 'Triggered when a task is assigned',
					},
					{
						name: 'Task Comment Added',
						value: 'task.comment_added',
						description: 'Triggered when a comment is added to a task',
					},
					{
						name: 'Task Completed',
						value: 'task.completed',
						description: 'Triggered when a task is completed',
					},
					{
						name: 'Task Created',
						value: 'task.created',
						description: 'Triggered when a new task is created',
					},
					{
						name: 'Task Deleted',
						value: 'task.deleted',
						description: 'Triggered when a task is deleted',
					},
					{
						name: 'Task Overdue',
						value: 'task.overdue',
						description: 'Triggered when a task becomes overdue',
					},
					{
						name: 'Task Priority Changed',
						value: 'task.priority_changed',
						description: 'Triggered when task priority changes',
					},
					{
						name: 'Task Status Changed',
						value: 'task.status_changed',
						description: 'Triggered when task status changes',
					},
					{
						name: 'Task Timesheet Added',
						value: 'task.timesheet_added',
						description: 'Triggered when a timesheet entry is added to a task',
					},
					{
						name: 'Task Updated',
						value: 'task.updated',
						description: 'Triggered when a task is updated',
					},
					// Ticket Events
					{
						name: 'Ticket Assigned',
						value: 'ticket.assigned',
						description: 'Triggered when a ticket is assigned',
					},
					{
						name: 'Ticket Attachment Added',
						value: 'ticket.attachment_added',
						description: 'Triggered when an attachment is added to a ticket',
					},
					{
						name: 'Ticket Closed',
						value: 'ticket.closed',
						description: 'Triggered when a ticket is closed',
					},
					{
						name: 'Ticket Created',
						value: 'ticket.created',
						description: 'Triggered when a new ticket is created',
					},
					{
						name: 'Ticket Deleted',
						value: 'ticket.deleted',
						description: 'Triggered when a ticket is deleted',
					},
					{
						name: 'Ticket Priority Changed',
						value: 'ticket.priority_changed',
						description: 'Triggered when ticket priority changes',
					},
					{
						name: 'Ticket Reopened',
						value: 'ticket.reopened',
						description: 'Triggered when a ticket is reopened',
					},
					{
						name: 'Ticket Reply Added',
						value: 'ticket.reply_added',
						description: 'Triggered when a reply is added to a ticket',
					},
					{
						name: 'Ticket Status Changed',
						value: 'ticket.status_changed',
						description: 'Triggered when ticket status changes',
					},
					{
						name: 'Ticket Updated',
						value: 'ticket.updated',
						description: 'Triggered when a ticket is updated',
					},
					// Timesheet Events
					{
						name: 'Timesheet Created',
						value: 'timesheet.created',
						description: 'Triggered when a new timesheet entry is created',
					},
					{
						name: 'Timesheet Deleted',
						value: 'timesheet.deleted',
						description: 'Triggered when a timesheet entry is deleted',
					},
					{
						name: 'Timesheet Updated',
						value: 'timesheet.updated',
						description: 'Triggered when a timesheet entry is updated',
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
