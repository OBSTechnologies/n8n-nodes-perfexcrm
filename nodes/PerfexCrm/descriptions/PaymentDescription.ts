import { INodeProperties } from 'n8n-workflow';

export const paymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['payment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new payment',
				action: 'Create a payment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a payment',
				action: 'Delete a payment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a payment',
				action: 'Get a payment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many payments',
				action: 'Get many payments',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a payment',
				action: 'Update a payment',
			},
		],
		default: 'create',
	},
];

export const paymentFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                              payment:create                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Invoice ID',
		name: 'invoiceid',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		description: 'The ID of the invoice this payment is for',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		description: 'Payment amount',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		description: 'Payment date (YYYY-MM-DD)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
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
				description: 'Payment note',
			},
			{
				displayName: 'Payment Mode',
				name: 'paymentmode',
				type: 'string',
				default: '',
				description: 'Payment mode (e.g. "Bank Transfer", "PayPal")',
			},
			{
				displayName: 'Transaction ID',
				name: 'transactionid',
				type: 'string',
				default: '',
				description: 'External transaction ID',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                payment:get                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['get'],
			},
		},
		description: 'The ID of the payment',
	},

	/* -------------------------------------------------------------------------- */
	/*                              payment:getAll                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['payment'],
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
				resource: ['payment'],
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
				resource: ['payment'],
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
				resource: ['payment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Filter by customer ID',
			},
			{
				displayName: 'Invoice ID',
				name: 'invoice_id',
				type: 'string',
				default: '',
				description: 'Filter by invoice ID',
			},
			{
				displayName: 'Payment Mode',
				name: 'payment_mode',
				type: 'string',
				default: '',
				description: 'Filter by payment mode',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              payment:update                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['update'],
			},
		},
		description: 'The ID of the payment',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Payment amount',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Payment date (YYYY-MM-DD)',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Payment note',
			},
			{
				displayName: 'Payment Mode',
				name: 'paymentmode',
				type: 'string',
				default: '',
				description: 'Payment mode (e.g. "Bank Transfer", "PayPal")',
			},
			{
				displayName: 'Transaction ID',
				name: 'transactionid',
				type: 'string',
				default: '',
				description: 'External transaction ID',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              payment:delete                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the payment',
	},
];
