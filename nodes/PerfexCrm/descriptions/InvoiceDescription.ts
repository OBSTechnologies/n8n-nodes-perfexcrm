import { INodeProperties } from 'n8n-workflow';

export const invoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['invoice'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new invoice',
				action: 'Create an invoice',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an invoice',
				action: 'Delete an invoice',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an invoice',
				action: 'Get an invoice',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many invoices',
				action: 'Get many invoices',
			},
			{
				name: 'Get PDF',
				value: 'getPdf',
				description: 'Get the invoice as a base64-encoded PDF',
				action: 'Get an invoice PDF',
			},
			{
				name: 'Get Payments',
				value: 'getPayments',
				description: 'Get all payments for an invoice',
				action: 'Get payments for invoice',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send an invoice to the client via email',
				action: 'Send an invoice',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an invoice',
				action: 'Update an invoice',
			},
		],
		default: 'create',
	},
];

export const invoiceFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                invoice:create                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		description: 'Client ID',
	},
	{
		displayName: 'Invoice Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		description: 'Invoice number',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		description: 'Invoice date',
	},
	{
		displayName: 'Due Date',
		name: 'duedate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		description: 'Invoice due date',
	},
	{
		displayName: 'Line Items',
		name: 'lineItems',
		type: 'fixedCollection',
		placeholder: 'Add Line Item',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		description: 'Line items for the invoice. Totals are calculated from these; without at least one item the invoice value is 0.',
		options: [
			{
				name: 'item',
				displayName: 'Item',
				values: [
					{ displayName: 'Description', name: 'description', type: 'string', default: '' },
					{ displayName: 'Long Description', name: 'long_description', type: 'string', default: '' },
					{ displayName: 'Quantity', name: 'qty', type: 'number', default: 1 },
					{ displayName: 'Rate', name: 'rate', type: 'number', default: 0, description: 'Unit price' },
					{ displayName: 'Tax Name', name: 'taxname', type: 'string', default: '', description: 'E.g. "VAT|24.00"; comma-separate multiple taxes' },
					{ displayName: 'Unit', name: 'unit', type: 'string', default: '', description: 'E.g. hours, pcs' },
				],
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Currency code (e.g., USD, EUR)',
			},
			{
				displayName: 'Subtotal',
				name: 'subtotal',
				type: 'number',
				default: 0,
				description: 'Invoice subtotal',
			},
			{
				displayName: 'Total',
				name: 'total',
				type: 'number',
				default: 0,
				description: 'Invoice total',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Unpaid',
						value: 1,
					},
					{
						name: 'Paid',
						value: 2,
					},
					{
						name: 'Partially Paid',
						value: 3,
					},
					{
						name: 'Overdue',
						value: 4,
					},
					{
						name: 'Cancelled',
						value: 5,
					},
					{
						name: 'Draft',
						value: 6,
					},
				],
				default: 1,
				description: 'Invoice status',
			},
			{
				displayName: 'Admin Note',
				name: 'adminnote',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Admin note (internal)',
			},
			{
				displayName: 'Client Note',
				name: 'clientnote',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Client note (visible to client)',
			},
			{
				displayName: 'Allowed Payment Modes',
				name: 'allowed_payment_modes',
				type: 'string',
				default: '',
				description: 'Comma-separated list of allowed payment mode IDs',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'fixedCollection',
				placeholder: 'Add Custom Field',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'Set PerfexCRM custom field values. Use each custom field\'s numeric ID or its slug as the key.',
				options: [
					{
						name: 'field',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field ID or Slug',
								name: 'key',
								type: 'string',
								default: '',
								description: 'Custom field numeric ID (e.g. 21) or slug',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value to store for this custom field',
							},
						],
					},
				],
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                invoice:get                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['get', 'getPdf'],
			},
		},
		description: 'The ID of the invoice',
	},

	/* -------------------------------------------------------------------------- */
	/*                                invoice:getAll                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		description: 'Number of results to skip before returning results',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Client ID',
				name: 'clientid',
				type: 'string',
				default: '',
				description: 'Filter by client ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Unpaid',
						value: '1',
					},
					{
						name: 'Paid',
						value: '2',
					},
					{
						name: 'Partially Paid',
						value: '3',
					},
					{
						name: 'Overdue',
						value: '4',
					},
					{
						name: 'Cancelled',
						value: '5',
					},
					{
						name: 'Draft',
						value: '6',
					},
				],
				default: '',
				description: 'Filter by status',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              invoice:getPayments                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getPayments'],
			},
		},
		description: 'The ID of the invoice',
	},

	/* -------------------------------------------------------------------------- */
	/*                                invoice:send                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['send'],
			},
		},
		description: 'The ID of the invoice to send',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['send'],
			},
		},
		options: [
			{
				displayName: 'CC',
				name: 'cc',
				type: 'string',
				default: '',
				description: 'CC email addresses (comma-separated)',
			},
			{
				displayName: 'Template',
				name: 'template',
				type: 'string',
				default: '',
				description: 'Email template name/ID to use',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                invoice:update                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['update'],
			},
		},
		description: 'The ID of the invoice',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Invoice Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Invoice number',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Invoice date',
			},
			{
				displayName: 'Due Date',
				name: 'duedate',
				type: 'dateTime',
				default: '',
				description: 'Invoice due date',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Currency code (e.g., USD, EUR)',
			},
			{
				displayName: 'Subtotal',
				name: 'subtotal',
				type: 'number',
				default: 0,
				description: 'Invoice subtotal',
			},
			{
				displayName: 'Total',
				name: 'total',
				type: 'number',
				default: 0,
				description: 'Invoice total',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Unpaid',
						value: 1,
					},
					{
						name: 'Paid',
						value: 2,
					},
					{
						name: 'Partially Paid',
						value: 3,
					},
					{
						name: 'Overdue',
						value: 4,
					},
					{
						name: 'Cancelled',
						value: 5,
					},
					{
						name: 'Draft',
						value: 6,
					},
				],
				default: 1,
				description: 'Invoice status',
			},
			{
				displayName: 'Admin Note',
				name: 'adminnote',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Admin note (internal)',
			},
			{
				displayName: 'Client Note',
				name: 'clientnote',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Client note (visible to client)',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'fixedCollection',
				placeholder: 'Add Custom Field',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'Set PerfexCRM custom field values. Use each custom field\'s numeric ID or its slug as the key.',
				options: [
					{
						name: 'field',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field ID or Slug',
								name: 'key',
								type: 'string',
								default: '',
								description: 'Custom field numeric ID (e.g. 21) or slug',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value to store for this custom field',
							},
						],
					},
				],
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                invoice:delete                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the invoice',
	},
];
