import { INodeProperties } from 'n8n-workflow';

export const expenseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['expense'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new expense',
				action: 'Create an expense',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an expense',
				action: 'Delete an expense',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an expense',
				action: 'Get an expense',
			},
			{
				name: 'Get Categories',
				value: 'getCategories',
				description: 'Get all expense categories',
				action: 'Get all expense categories',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many expenses',
				action: 'Get many expenses',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an expense',
				action: 'Update an expense',
			},
		],
		default: 'create',
	},
];

export const expenseFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                               expense:create                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Category',
		name: 'category',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
		description: 'Expense category ID',
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
				resource: ['expense'],
				operation: ['create'],
			},
		},
		description: 'Expense amount',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
		description: 'Expense date (YYYY-MM-DD)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Billable',
				name: 'billable',
				type: 'boolean',
				default: false,
				description: 'Whether the expense is billable',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Expense currency code (e.g. "USD", "EUR")',
			},
			{
				displayName: 'Customer ID',
				name: 'clientid',
				type: 'string',
				default: '',
				description: 'Customer ID to associate the expense with',
			},
			{
				displayName: 'Expense Name',
				name: 'expense_name',
				type: 'string',
				default: '',
				description: 'Name of the expense',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Expense note',
			},
			{
				displayName: 'Project ID',
				name: 'project_id',
				type: 'string',
				default: '',
				description: 'Project ID to associate the expense with',
			},
			{
				displayName: 'Tax',
				name: 'tax',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Tax percentage',
			},
			{
				displayName: 'Tax 2',
				name: 'tax2',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Second tax percentage',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                expense:get                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Expense ID',
		name: 'expenseId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['get'],
			},
		},
		description: 'The ID of the expense',
	},

	/* -------------------------------------------------------------------------- */
	/*                               expense:getAll                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['expense'],
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
				resource: ['expense'],
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
				resource: ['expense'],
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
				resource: ['expense'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Billable',
				name: 'billable',
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
				description: 'Filter by billable status',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Filter by expense category ID',
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
				description: 'Search expenses by name or note',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Filter by expense status',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                               expense:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Expense ID',
		name: 'expenseId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['update'],
			},
		},
		description: 'The ID of the expense',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['expense'],
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
				description: 'Expense amount',
			},
			{
				displayName: 'Billable',
				name: 'billable',
				type: 'boolean',
				default: false,
				description: 'Whether the expense is billable',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Expense category ID',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Expense currency code (e.g. "USD", "EUR")',
			},
			{
				displayName: 'Customer ID',
				name: 'clientid',
				type: 'string',
				default: '',
				description: 'Customer ID to associate the expense with',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Expense date (YYYY-MM-DD)',
			},
			{
				displayName: 'Expense Name',
				name: 'expense_name',
				type: 'string',
				default: '',
				description: 'Name of the expense',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Expense note',
			},
			{
				displayName: 'Project ID',
				name: 'project_id',
				type: 'string',
				default: '',
				description: 'Project ID to associate the expense with',
			},
			{
				displayName: 'Tax',
				name: 'tax',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Tax percentage',
			},
			{
				displayName: 'Tax 2',
				name: 'tax2',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Second tax percentage',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                               expense:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Expense ID',
		name: 'expenseId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['expense'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the expense',
	},

	/* -------------------------------------------------------------------------- */
	/*                           expense:getCategories                            */
	/* -------------------------------------------------------------------------- */
];
