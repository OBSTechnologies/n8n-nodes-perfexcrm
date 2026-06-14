import { INodeProperties } from 'n8n-workflow';

export const knowledgeBaseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a knowledge base article',
				action: 'Create a knowledge base article',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a knowledge base article',
				action: 'Delete a knowledge base article',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a knowledge base article',
				action: 'Get a knowledge base article',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many knowledge base articles',
				action: 'Get many knowledge base articles',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a knowledge base article',
				action: 'Update a knowledge base article',
			},
		],
		default: 'get',
	},
];

export const knowledgeBaseFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                           knowledgeBase:create                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
				operation: ['create'],
			},
		},
		description: 'The article title',
	},
	{
		displayName: 'Content',
		name: 'description',
		type: 'string',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
				operation: ['create'],
			},
		},
		description: 'The article content',
	},
	{
		displayName: 'Group ID',
		name: 'articlegroup',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
				operation: ['create'],
			},
		},
		description: 'The ID of the knowledge base group this article belongs to',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the article is visible/published',
			},
			{
				displayName: 'Order',
				name: 'article_order',
				type: 'number',
				default: 0,
				description: 'Display order of the article within its group',
			},
			{
				displayName: 'Staff Only',
				name: 'staff_article',
				type: 'boolean',
				default: false,
				description: 'Whether the article is visible to staff only',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                             knowledgeBase:get                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
				operation: ['get'],
			},
		},
		description: 'The ID of the knowledge base article',
	},

	/* -------------------------------------------------------------------------- */
	/*                           knowledgeBase:getAll                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
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
				resource: ['knowledgeBase'],
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
				resource: ['knowledgeBase'],
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
				resource: ['knowledgeBase'],
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
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				description: 'Filter by knowledge base group ID',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search in subject or content',
			},
			{
				displayName: 'Sort By',
				name: 'sort_by',
				type: 'string',
				default: '',
				description: 'Field to sort the results by',
			},
			{
				displayName: 'Sort Order',
				name: 'sort_order',
				type: 'options',
				options: [
					{
						name: 'Ascending',
						value: 'asc',
					},
					{
						name: 'Descending',
						value: 'desc',
					},
				],
				default: 'asc',
				description: 'Direction to sort the results',
			},
			{
				displayName: 'Staff Only',
				name: 'staff_article',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Staff Only',
						value: '1',
					},
					{
						name: 'Public',
						value: '0',
					},
				],
				default: '',
				description: 'Filter by staff-only visibility',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                           knowledgeBase:update                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
				operation: ['update'],
			},
		},
		description: 'The ID of the knowledge base article',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the article is visible/published',
			},
			{
				displayName: 'Content',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'The article content',
			},
			{
				displayName: 'Group ID',
				name: 'articlegroup',
				type: 'number',
				default: 0,
				description: 'The ID of the knowledge base group this article belongs to',
			},
			{
				displayName: 'Order',
				name: 'article_order',
				type: 'number',
				default: 0,
				description: 'Display order of the article within its group',
			},
			{
				displayName: 'Staff Only',
				name: 'staff_article',
				type: 'boolean',
				default: false,
				description: 'Whether the article is visible to staff only',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'The article title',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                           knowledgeBase:delete                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the knowledge base article',
	},
];
