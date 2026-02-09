import { INodeProperties } from 'n8n-workflow';

export const subscriptionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['subscription'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new subscription',
				action: 'Create a subscription',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a subscription',
				action: 'Delete a subscription',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a subscription',
				action: 'Get a subscription',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many subscriptions',
				action: 'Get many subscriptions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a subscription',
				action: 'Update a subscription',
			},
		],
		default: 'create',
	},
];

export const subscriptionFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                            subscription:create                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		description: 'Subscription name',
	},
	{
		displayName: 'Customer ID',
		name: 'clientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		description: 'Customer ID to associate the subscription with (maps to clientid)',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		description: 'Currency code (e.g. "USD", "EUR")',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Subscription date (YYYY-MM-DD)',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Subscription description',
			},
			{
				displayName: 'Ends At',
				name: 'ends_at',
				type: 'dateTime',
				default: '',
				description: 'Date when the subscription ends',
			},
			{
				displayName: 'In Test Environment',
				name: 'in_test_environment',
				type: 'boolean',
				default: false,
				description: 'Whether the subscription is in a test environment',
			},
			{
				displayName: 'Next Billing Cycle',
				name: 'next_billing_cycle',
				type: 'dateTime',
				default: '',
				description: 'Date of the next billing cycle',
			},
			{
				displayName: 'Project ID',
				name: 'project_id',
				type: 'string',
				default: '',
				description: 'Project ID to associate the subscription with',
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				description: 'Subscription quantity',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Subscription status',
			},
			{
				displayName: 'Stripe Plan ID',
				name: 'stripe_plan_id',
				type: 'string',
				default: '',
				description: 'Stripe plan ID for the subscription',
			},
			{
				displayName: 'Terms',
				name: 'terms',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Subscription terms and conditions',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              subscription:get                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['get'],
			},
		},
		description: 'The ID of the subscription',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Include Customer',
				name: 'includeCustomer',
				type: 'boolean',
				default: false,
				description: 'Whether to include the customer data in the response',
			},
			{
				displayName: 'Include Invoices',
				name: 'includeInvoices',
				type: 'boolean',
				default: false,
				description: 'Whether to include related invoices in the response',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                            subscription:getAll                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['subscription'],
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
				resource: ['subscription'],
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
				resource: ['subscription'],
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
				resource: ['subscription'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Created From',
				name: 'created_from',
				type: 'dateTime',
				default: '',
				description: 'Filter subscriptions created from this date',
			},
			{
				displayName: 'Created To',
				name: 'created_to',
				type: 'dateTime',
				default: '',
				description: 'Filter subscriptions created up to this date',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Filter by currency code (e.g. "USD", "EUR")',
			},
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Filter by customer ID',
			},
			{
				displayName: 'In Test Environment',
				name: 'in_test_environment',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Yes',
						value: '1',
					},
					{
						name: 'No',
						value: '0',
					},
				],
				default: '',
				description: 'Filter by test environment status',
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
				description: 'Search subscriptions by name or description',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Filter by subscription status',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                            subscription:update                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['update'],
			},
		},
		description: 'The ID of the subscription',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Customer ID',
				name: 'clientid',
				type: 'string',
				default: '',
				description: 'Customer ID to associate the subscription with',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Currency code (e.g. "USD", "EUR")',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Subscription date (YYYY-MM-DD)',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Subscription description',
			},
			{
				displayName: 'Ends At',
				name: 'ends_at',
				type: 'dateTime',
				default: '',
				description: 'Date when the subscription ends',
			},
			{
				displayName: 'In Test Environment',
				name: 'in_test_environment',
				type: 'boolean',
				default: false,
				description: 'Whether the subscription is in a test environment',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Subscription name',
			},
			{
				displayName: 'Next Billing Cycle',
				name: 'next_billing_cycle',
				type: 'dateTime',
				default: '',
				description: 'Date of the next billing cycle',
			},
			{
				displayName: 'Project ID',
				name: 'project_id',
				type: 'string',
				default: '',
				description: 'Project ID to associate the subscription with',
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 0,
				description: 'Subscription quantity',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Subscription status',
			},
			{
				displayName: 'Stripe Plan ID',
				name: 'stripe_plan_id',
				type: 'string',
				default: '',
				description: 'Stripe plan ID for the subscription',
			},
			{
				displayName: 'Terms',
				name: 'terms',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Subscription terms and conditions',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                            subscription:delete                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the subscription',
	},
];
