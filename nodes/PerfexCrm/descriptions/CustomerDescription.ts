import { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new customer',
				action: 'Create a customer',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a customer',
				action: 'Delete a customer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a customer',
				action: 'Get a customer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many customers',
				action: 'Get many customers',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a customer',
				action: 'Update a customer',
			},
			{
				name: 'Get Contacts',
				value: 'getContacts',
				description: 'Get contacts for a customer',
				action: 'Get contacts for a customer',
			},
			{
				name: 'Get Contracts',
				value: 'getContracts',
				description: 'Get contracts for a customer',
				action: 'Get contracts for a customer',
			},
			{
				name: 'Get Invoices',
				value: 'getInvoices',
				description: 'Get invoices for a customer',
				action: 'Get invoices for a customer',
			},
			{
				name: 'Get Projects',
				value: 'getProjects',
				description: 'Get projects for a customer',
				action: 'Get projects for a customer',
			},
			{
				name: 'Get Tickets',
				value: 'getTickets',
				description: 'Get tickets for a customer',
				action: 'Get tickets for a customer',
			},
		],
		default: 'create',
	},
];

export const customerFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                customer:create                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Company',
		name: 'company',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		description: 'Company name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'VAT',
				name: 'vat',
				type: 'string',
				default: '',
				description: 'VAT number',
			},
			{
				displayName: 'Phone',
				name: 'phonenumber',
				type: 'string',
				default: '',
				description: 'Phone number',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Country',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City',
			},
			{
				displayName: 'Zip',
				name: 'zip',
				type: 'string',
				default: '',
				description: 'Zip code',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State',
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Address',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website URL',
			},
			{
				displayName: 'Billing Street',
				name: 'billing_street',
				type: 'string',
				default: '',
				description: 'Billing street address',
			},
			{
				displayName: 'Billing City',
				name: 'billing_city',
				type: 'string',
				default: '',
				description: 'Billing city',
			},
			{
				displayName: 'Billing State',
				name: 'billing_state',
				type: 'string',
				default: '',
				description: 'Billing state',
			},
			{
				displayName: 'Billing Zip',
				name: 'billing_zip',
				type: 'string',
				default: '',
				description: 'Billing zip code',
			},
			{
				displayName: 'Billing Country',
				name: 'billing_country',
				type: 'string',
				default: '',
				description: 'Billing country',
			},
			{
				displayName: 'Shipping Street',
				name: 'shipping_street',
				type: 'string',
				default: '',
				description: 'Shipping street address',
			},
			{
				displayName: 'Shipping City',
				name: 'shipping_city',
				type: 'string',
				default: '',
				description: 'Shipping city',
			},
			{
				displayName: 'Shipping State',
				name: 'shipping_state',
				type: 'string',
				default: '',
				description: 'Shipping state',
			},
			{
				displayName: 'Shipping Zip',
				name: 'shipping_zip',
				type: 'string',
				default: '',
				description: 'Shipping zip code',
			},
			{
				displayName: 'Shipping Country',
				name: 'shipping_country',
				type: 'string',
				default: '',
				description: 'Shipping country',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                customer:get                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get'],
			},
		},
		description: 'The ID of the customer',
	},

	/* -------------------------------------------------------------------------- */
	/*                                customer:getAll                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
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
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Active',
						value: '1',
					},
					{
						name: 'Inactive',
						value: '0',
					},
				],
				default: '',
				description: 'Filter by active status',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                customer:update                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		description: 'The ID of the customer',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				description: 'Company name',
			},
			{
				displayName: 'VAT',
				name: 'vat',
				type: 'string',
				default: '',
				description: 'VAT number',
			},
			{
				displayName: 'Phone',
				name: 'phonenumber',
				type: 'string',
				default: '',
				description: 'Phone number',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Country',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City',
			},
			{
				displayName: 'Zip',
				name: 'zip',
				type: 'string',
				default: '',
				description: 'Zip code',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State',
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Address',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website URL',
			},
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the customer is active',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                customer:delete                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the customer',
	},

	/* -------------------------------------------------------------------------- */
	/*                                customer:getContacts                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getContacts'],
			},
		},
		description: 'The ID of the customer',
	},

	/* -------------------------------------------------------------------------- */
	/*                                customer:getContracts                      */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getContracts'],
			},
		},
		description: 'The ID of the customer',
	},

	/* -------------------------------------------------------------------------- */
	/*                                customer:getInvoices                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getInvoices'],
			},
		},
		description: 'The ID of the customer',
	},

	/* -------------------------------------------------------------------------- */
	/*                                customer:getProjects                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getProjects'],
			},
		},
		description: 'The ID of the customer',
	},

	/* -------------------------------------------------------------------------- */
	/*                                customer:getTickets                        */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getTickets'],
			},
		},
		description: 'The ID of the customer',
	},
];