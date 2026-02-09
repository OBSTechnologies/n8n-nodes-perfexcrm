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
		],
		default: 'get',
	},
];

export const itemFields: INodeProperties[] = [
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
	/*                              item:getGroups                                */
	/* -------------------------------------------------------------------------- */
	/* No additional fields required */
];
