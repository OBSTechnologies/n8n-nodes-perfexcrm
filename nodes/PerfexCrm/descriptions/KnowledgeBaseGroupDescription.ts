import { INodeProperties } from 'n8n-workflow';

export const knowledgeBaseGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['knowledgeBaseGroup'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a knowledge base group',
				action: 'Create a knowledge base group',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a knowledge base group',
				action: 'Delete a knowledge base group',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a knowledge base group',
				action: 'Get a knowledge base group',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many knowledge base groups',
				action: 'Get many knowledge base groups',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a knowledge base group',
				action: 'Update a knowledge base group',
			},
		],
		default: 'get',
	},
];

export const knowledgeBaseGroupFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                        knowledgeBaseGroup:create                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['knowledgeBaseGroup'],
				operation: ['create'],
			},
		},
		description: 'The name of the knowledge base group',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['knowledgeBaseGroup'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the group is visible/published',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '',
				description: 'Hex color used for the group',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'A description of the group',
			},
			{
				displayName: 'Order',
				name: 'group_order',
				type: 'number',
				default: 0,
				description: 'Display order of the group',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                          knowledgeBaseGroup:get                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['knowledgeBaseGroup'],
				operation: ['get'],
			},
		},
		description: 'The ID of the knowledge base group',
	},

	/* -------------------------------------------------------------------------- */
	/*                        knowledgeBaseGroup:getAll                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['knowledgeBaseGroup'],
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
				resource: ['knowledgeBaseGroup'],
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
				resource: ['knowledgeBaseGroup'],
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
				resource: ['knowledgeBaseGroup'],
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
				description: 'Search in group name or description',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                        knowledgeBaseGroup:update                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['knowledgeBaseGroup'],
				operation: ['update'],
			},
		},
		description: 'The ID of the knowledge base group',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['knowledgeBaseGroup'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the group is visible/published',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '',
				description: 'Hex color used for the group',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'A description of the group',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the knowledge base group',
			},
			{
				displayName: 'Order',
				name: 'group_order',
				type: 'number',
				default: 0,
				description: 'Display order of the group',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                        knowledgeBaseGroup:delete                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['knowledgeBaseGroup'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the knowledge base group',
	},
];
