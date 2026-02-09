import { INodeProperties } from 'n8n-workflow';

export const creditNoteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['creditNote'],
			},
		},
		options: [
			{
				name: 'Add Refund',
				value: 'addRefund',
				description: 'Add a refund to a credit note',
				action: 'Add a refund to a credit note',
			},
			{
				name: 'Apply Credit',
				value: 'applyCredit',
				description: 'Apply credit to an invoice',
				action: 'Apply credit to an invoice',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new credit note',
				action: 'Create a credit note',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a credit note',
				action: 'Delete a credit note',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a credit note',
				action: 'Get a credit note',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many credit notes',
				action: 'Get many credit notes',
			},
			{
				name: 'List Credits',
				value: 'listCredits',
				description: 'List all credits applied from a credit note',
				action: 'List credits for a credit note',
			},
			{
				name: 'List Refunds',
				value: 'listRefunds',
				description: 'List all refunds for a credit note',
				action: 'List refunds for a credit note',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a credit note',
				action: 'Update a credit note',
			},
		],
		default: 'create',
	},
];

export const creditNoteFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                           creditNote:addRefund                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Credit Note ID',
		name: 'creditNoteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['addRefund'],
			},
		},
		description: 'The ID of the credit note',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		typeOptions: {
			minValue: 0.01,
		},
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['addRefund'],
			},
		},
		description: 'Refund amount',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['addRefund'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Refund note',
			},
			{
				displayName: 'Payment Mode',
				name: 'payment_mode',
				type: 'string',
				default: '',
				description: 'Payment mode used for the refund',
			},
			{
				displayName: 'Refunded On',
				name: 'refunded_on',
				type: 'dateTime',
				default: '',
				description: 'Date the refund was made (YYYY-MM-DD)',
			},
			{
				displayName: 'Staff ID',
				name: 'staff_id',
				type: 'string',
				default: '',
				description: 'Staff member ID who processed the refund',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                          creditNote:applyCredit                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Credit Note ID',
		name: 'creditNoteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['applyCredit'],
			},
		},
		description: 'The ID of the credit note',
	},
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['applyCredit'],
			},
		},
		description: 'The ID of the invoice to apply the credit to',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		typeOptions: {
			minValue: 0.01,
		},
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['applyCredit'],
			},
		},
		description: 'Amount of credit to apply',
	},

	/* -------------------------------------------------------------------------- */
	/*                            creditNote:create                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['create'],
			},
		},
		description: 'Client ID',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['create'],
			},
		},
		description: 'Credit note date (YYYY-MM-DD)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['create'],
			},
		},
		options: [
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
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Currency code (e.g., USD, EUR)',
			},
			{
				displayName: 'Discount Percent',
				name: 'discount_percent',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Discount percentage',
			},
			{
				displayName: 'Discount Total',
				name: 'discount_total',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Discount total amount',
			},
			{
				displayName: 'Discount Type',
				name: 'discount_type',
				type: 'string',
				default: '',
				description: 'Discount type',
			},
			{
				displayName: 'Reference Number',
				name: 'reference_no',
				type: 'string',
				default: '',
				description: 'Reference number',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Open',
						value: 1,
					},
					{
						name: 'Closed',
						value: 2,
					},
					{
						name: 'Void',
						value: 3,
					},
				],
				default: 1,
				description: 'Credit note status',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated tags',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                            creditNote:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Credit Note ID',
		name: 'creditNoteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the credit note',
	},

	/* -------------------------------------------------------------------------- */
	/*                              creditNote:get                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Credit Note ID',
		name: 'creditNoteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['get'],
			},
		},
		description: 'The ID of the credit note',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Include Credits',
				name: 'includeCredits',
				type: 'boolean',
				default: false,
				description: 'Whether to include applied credits in the response',
			},
			{
				displayName: 'Include Refunds',
				name: 'includeRefunds',
				type: 'boolean',
				default: false,
				description: 'Whether to include refunds in the response',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                            creditNote:getAll                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['creditNote'],
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
				resource: ['creditNote'],
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
				resource: ['creditNote'],
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
				resource: ['creditNote'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Filter by currency code (e.g., USD, EUR)',
			},
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Filter by customer ID',
			},
			{
				displayName: 'Date From',
				name: 'date_from',
				type: 'dateTime',
				default: '',
				description: 'Filter credit notes with date from this date',
			},
			{
				displayName: 'Date To',
				name: 'date_to',
				type: 'dateTime',
				default: '',
				description: 'Filter credit notes with date up to this date',
			},
			{
				displayName: 'Project ID',
				name: 'project_id',
				type: 'string',
				default: '',
				description: 'Filter by project ID',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search credit notes by keyword',
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
						name: 'Open',
						value: '1',
					},
					{
						name: 'Closed',
						value: '2',
					},
					{
						name: 'Void',
						value: '3',
					},
				],
				default: '',
				description: 'Filter by status',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                          creditNote:listCredits                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Credit Note ID',
		name: 'creditNoteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['listCredits'],
			},
		},
		description: 'The ID of the credit note',
	},

	/* -------------------------------------------------------------------------- */
	/*                          creditNote:listRefunds                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Credit Note ID',
		name: 'creditNoteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['listRefunds'],
			},
		},
		description: 'The ID of the credit note',
	},

	/* -------------------------------------------------------------------------- */
	/*                            creditNote:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Credit Note ID',
		name: 'creditNoteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['update'],
			},
		},
		description: 'The ID of the credit note',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['creditNote'],
				operation: ['update'],
			},
		},
		options: [
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
				displayName: 'Client ID',
				name: 'clientid',
				type: 'string',
				default: '',
				description: 'Client ID',
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
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Currency code (e.g., USD, EUR)',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Credit note date (YYYY-MM-DD)',
			},
			{
				displayName: 'Discount Percent',
				name: 'discount_percent',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Discount percentage',
			},
			{
				displayName: 'Discount Total',
				name: 'discount_total',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Discount total amount',
			},
			{
				displayName: 'Discount Type',
				name: 'discount_type',
				type: 'string',
				default: '',
				description: 'Discount type',
			},
			{
				displayName: 'Reference Number',
				name: 'reference_no',
				type: 'string',
				default: '',
				description: 'Reference number',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Open',
						value: 1,
					},
					{
						name: 'Closed',
						value: 2,
					},
					{
						name: 'Void',
						value: 3,
					},
				],
				default: 1,
				description: 'Credit note status',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated tags',
			},
		],
	},
];
