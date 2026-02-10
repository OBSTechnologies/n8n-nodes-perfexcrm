import { INodeProperties } from 'n8n-workflow';

export const itemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['item'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a catalog item',
				action: 'Create a catalog item',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a catalog item',
				action: 'Delete a catalog item',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a catalog item',
				action: 'Get a catalog item',
			},
			{
				name: 'Get Groups',
				value: 'getGroups',
				description: 'Get all item groups',
				action: 'Get all item groups',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many catalog items',
				action: 'Get many catalog items',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a catalog item',
				action: 'Update a catalog item',
			},
		],
		default: 'get',
	},
];

export const itemFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                item:create                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['create'],
			},
		},
		description: 'Item description (name)',
	},
	{
		displayName: 'Rate',
		name: 'rate',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['create'],
			},
		},
		description: 'Item rate/price',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				description: 'Item group ID',
			},
			{
				displayName: 'Long Description',
				name: 'long_description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Detailed item description',
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
			{
				displayName: 'Unit',
				name: 'unit',
				type: 'string',
				default: '',
				description: 'Unit of measure (e.g. "hours", "pcs")',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                  item:get                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['get'],
			},
		},
		description: 'The ID of the catalog item',
	},

	/* -------------------------------------------------------------------------- */
	/*                                item:getAll                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['item'],
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
				resource: ['item'],
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
				resource: ['item'],
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
				resource: ['item'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				description: 'Filter by item group ID',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search in description or long description',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                               item:update                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['update'],
			},
		},
		description: 'The ID of the catalog item',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Item description (name)',
			},
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				description: 'Item group ID',
			},
			{
				displayName: 'Long Description',
				name: 'long_description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Detailed item description',
			},
			{
				displayName: 'Rate',
				name: 'rate',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Item rate/price',
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
			{
				displayName: 'Unit',
				name: 'unit',
				type: 'string',
				default: '',
				description: 'Unit of measure (e.g. "hours", "pcs")',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                               item:delete                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the catalog item',
	},

	/* -------------------------------------------------------------------------- */
	/*                              item:getGroups                                */
	/* -------------------------------------------------------------------------- */
	/* No additional fields required */
];
