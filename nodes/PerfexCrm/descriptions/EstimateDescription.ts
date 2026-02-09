import { INodeProperties } from 'n8n-workflow';

export const estimateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['estimate'],
			},
		},
		options: [
			{
				name: 'Convert',
				value: 'convert',
				description: 'Convert an estimate to an invoice',
				action: 'Convert an estimate',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new estimate',
				action: 'Create an estimate',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an estimate',
				action: 'Delete an estimate',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an estimate',
				action: 'Get an estimate',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many estimates',
				action: 'Get many estimates',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send an estimate to the client via email',
				action: 'Send an estimate',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an estimate',
				action: 'Update an estimate',
			},
			{
				name: 'Get PDF',
				value: 'getPdf',
				description: 'Download an estimate as PDF',
				action: 'Get estimate PDF',
			},
		],
		default: 'create',
	},
];

export const estimateFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                              estimate:create                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['estimate'],
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
				resource: ['estimate'],
				operation: ['create'],
			},
		},
		description: 'Estimate date',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['estimate'],
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
				displayName: 'Adjustment',
				name: 'adjustment',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Adjustment amount',
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
				displayName: 'Expiry Date',
				name: 'expirydate',
				type: 'dateTime',
				default: '',
				description: 'Estimate expiry date',
			},
			{
				displayName: 'Reference Number',
				name: 'reference_no',
				type: 'string',
				default: '',
				description: 'Reference number',
			},
			{
				displayName: 'Sale Agent',
				name: 'sale_agent',
				type: 'string',
				default: '',
				description: 'Sale agent staff ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Draft',
						value: 1,
					},
					{
						name: 'Sent',
						value: 2,
					},
					{
						name: 'Declined',
						value: 3,
					},
					{
						name: 'Accepted',
						value: 4,
					},
					{
						name: 'Expired',
						value: 5,
					},
				],
				default: 1,
				description: 'Estimate status',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated tags',
			},
			{
				displayName: 'Terms',
				name: 'terms',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Estimate terms and conditions',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                               estimate:get                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Estimate ID',
		name: 'estimateId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['estimate'],
				operation: ['get'],
			},
		},
		description: 'The ID of the estimate',
	},

	/* -------------------------------------------------------------------------- */
	/*                              estimate:getAll                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['estimate'],
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
				resource: ['estimate'],
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
				resource: ['estimate'],
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
				resource: ['estimate'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Agent',
				name: 'agent',
				type: 'string',
				default: '',
				description: 'Filter by sale agent staff ID',
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
				description: 'Filter estimates with date from this date',
			},
			{
				displayName: 'Date To',
				name: 'date_to',
				type: 'dateTime',
				default: '',
				description: 'Filter estimates with date up to this date',
			},
			{
				displayName: 'Expiry From',
				name: 'expiry_from',
				type: 'dateTime',
				default: '',
				description: 'Filter estimates with expiry date from this date',
			},
			{
				displayName: 'Expiry To',
				name: 'expiry_to',
				type: 'dateTime',
				default: '',
				description: 'Filter estimates with expiry date up to this date',
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
				description: 'Search term',
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
						name: 'Draft',
						value: '1',
					},
					{
						name: 'Sent',
						value: '2',
					},
					{
						name: 'Declined',
						value: '3',
					},
					{
						name: 'Accepted',
						value: '4',
					},
					{
						name: 'Expired',
						value: '5',
					},
				],
				default: '',
				description: 'Filter by status',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              estimate:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Estimate ID',
		name: 'estimateId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['estimate'],
				operation: ['update'],
			},
		},
		description: 'The ID of the estimate',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['estimate'],
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
				displayName: 'Adjustment',
				name: 'adjustment',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Adjustment amount',
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
				description: 'Estimate date',
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
				displayName: 'Expiry Date',
				name: 'expirydate',
				type: 'dateTime',
				default: '',
				description: 'Estimate expiry date',
			},
			{
				displayName: 'Reference Number',
				name: 'reference_no',
				type: 'string',
				default: '',
				description: 'Reference number',
			},
			{
				displayName: 'Sale Agent',
				name: 'sale_agent',
				type: 'string',
				default: '',
				description: 'Sale agent staff ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Draft',
						value: 1,
					},
					{
						name: 'Sent',
						value: 2,
					},
					{
						name: 'Declined',
						value: 3,
					},
					{
						name: 'Accepted',
						value: 4,
					},
					{
						name: 'Expired',
						value: 5,
					},
				],
				default: 1,
				description: 'Estimate status',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated tags',
			},
			{
				displayName: 'Terms',
				name: 'terms',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Estimate terms and conditions',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              estimate:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Estimate ID',
		name: 'estimateId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['estimate'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the estimate',
	},

	/* -------------------------------------------------------------------------- */
	/*                               estimate:send                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Estimate ID',
		name: 'estimateId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['estimate'],
				operation: ['send'],
			},
		},
		description: 'The ID of the estimate to send',
	},

	/* -------------------------------------------------------------------------- */
	/*                             estimate:convert                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Estimate ID',
		name: 'estimateId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['estimate'],
				operation: ['convert'],
			},
		},
		description: 'The ID of the estimate to convert to an invoice',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['estimate'],
				operation: ['convert'],
			},
		},
		options: [
			{
				displayName: 'Draft',
				name: 'draft',
				type: 'boolean',
				default: false,
				description: 'Whether to create the invoice as a draft',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              estimate:getPdf                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Estimate ID',
		name: 'estimateId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['estimate'],
				operation: ['getPdf'],
			},
		},
		description: 'The ID of the estimate',
	},
];
