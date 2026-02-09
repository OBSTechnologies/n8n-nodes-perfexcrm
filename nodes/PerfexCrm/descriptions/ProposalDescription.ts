import { INodeProperties } from 'n8n-workflow';

export const proposalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['proposal'],
			},
		},
		options: [
			{
				name: 'Accept',
				value: 'accept',
				description: 'Mark a proposal as accepted',
				action: 'Accept a proposal',
			},
			{
				name: 'Add Comment',
				value: 'addComment',
				description: 'Add a comment to a proposal',
				action: 'Add comment to proposal',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new proposal',
				action: 'Create a proposal',
			},
			{
				name: 'Decline',
				value: 'decline',
				description: 'Mark a proposal as declined',
				action: 'Decline a proposal',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a proposal',
				action: 'Delete a proposal',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a proposal',
				action: 'Get a proposal',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many proposals',
				action: 'Get many proposals',
			},
			{
				name: 'List Comments',
				value: 'listComments',
				description: 'Get all comments for a proposal',
				action: 'Get all comments for proposal',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send a proposal to the customer via email',
				action: 'Send a proposal',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a proposal',
				action: 'Update a proposal',
			},
		],
		default: 'create',
	},
];

export const proposalFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                              proposal:accept                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Proposal ID',
		name: 'proposalId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['accept'],
			},
		},
		description: 'The ID of the proposal to accept',
	},

	/* -------------------------------------------------------------------------- */
	/*                            proposal:addComment                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Proposal ID',
		name: 'proposalId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['addComment'],
			},
		},
		description: 'The ID of the proposal',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['addComment'],
			},
		},
		description: 'Comment content',
	},

	/* -------------------------------------------------------------------------- */
	/*                              proposal:create                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['create'],
			},
		},
		description: 'Proposal subject',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['create'],
			},
		},
		description: 'Proposal date',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Proposal address',
			},
			{
				displayName: 'Adjustment',
				name: 'adjustment',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Proposal adjustment amount',
			},
			{
				displayName: 'Allow Comments',
				name: 'allow_comments',
				type: 'boolean',
				default: true,
				description: 'Whether to allow comments on the proposal',
			},
			{
				displayName: 'Assigned',
				name: 'assigned',
				type: 'string',
				default: '',
				description: 'Assigned staff member ID',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'Proposal city',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Proposal country',
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
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Proposal recipient email',
			},
			{
				displayName: 'Open Till',
				name: 'open_till',
				type: 'dateTime',
				default: '',
				description: 'Proposal open until date',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Proposal recipient phone',
			},
			{
				displayName: 'Proposal To',
				name: 'proposal_to',
				type: 'string',
				default: '',
				description: 'Proposal recipient name',
			},
			{
				displayName: 'Related ID',
				name: 'rel_id',
				type: 'string',
				default: '',
				description: 'Related item ID (used with Related Type)',
			},
			{
				displayName: 'Related Type',
				name: 'rel_type',
				type: 'options',
				options: [
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
				],
				default: 'customer',
				description: 'Related item type',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Proposal state',
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
						name: 'Declined',
						value: 2,
					},
					{
						name: 'Accepted',
						value: 3,
					},
					{
						name: 'Sent',
						value: 4,
					},
					{
						name: 'Revised',
						value: 5,
					},
					{
						name: 'Draft',
						value: 6,
					},
				],
				default: 1,
				description: 'Proposal status',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated tags',
			},
			{
				displayName: 'Zip',
				name: 'zip',
				type: 'string',
				default: '',
				description: 'Proposal zip/postal code',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                             proposal:decline                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Proposal ID',
		name: 'proposalId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['decline'],
			},
		},
		description: 'The ID of the proposal to decline',
	},

	/* -------------------------------------------------------------------------- */
	/*                              proposal:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Proposal ID',
		name: 'proposalId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the proposal',
	},

	/* -------------------------------------------------------------------------- */
	/*                                proposal:get                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Proposal ID',
		name: 'proposalId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['get'],
			},
		},
		description: 'The ID of the proposal',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Include Comments',
				name: 'includeComments',
				type: 'boolean',
				default: false,
				description: 'Whether to include proposal comments',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              proposal:getAll                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['proposal'],
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
				resource: ['proposal'],
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
				resource: ['proposal'],
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
				resource: ['proposal'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Assigned',
				name: 'assigned',
				type: 'string',
				default: '',
				description: 'Filter by assigned staff ID',
			},
			{
				displayName: 'Date From',
				name: 'date_from',
				type: 'dateTime',
				default: '',
				description: 'Filter proposals with date from this date',
			},
			{
				displayName: 'Date To',
				name: 'date_to',
				type: 'dateTime',
				default: '',
				description: 'Filter proposals with date up to this date',
			},
			{
				displayName: 'Open Till From',
				name: 'open_till_from',
				type: 'dateTime',
				default: '',
				description: 'Filter proposals with open till date from this date',
			},
			{
				displayName: 'Open Till To',
				name: 'open_till_to',
				type: 'dateTime',
				default: '',
				description: 'Filter proposals with open till date up to this date',
			},
			{
				displayName: 'Project ID',
				name: 'project_id',
				type: 'string',
				default: '',
				description: 'Filter by project ID',
			},
			{
				displayName: 'Related ID',
				name: 'rel_id',
				type: 'string',
				default: '',
				description: 'Filter by related item ID',
			},
			{
				displayName: 'Related Type',
				name: 'rel_type',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
				],
				default: '',
				description: 'Filter by related type',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search proposals by subject or content',
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
						name: 'Declined',
						value: '2',
					},
					{
						name: 'Accepted',
						value: '3',
					},
					{
						name: 'Sent',
						value: '4',
					},
					{
						name: 'Revised',
						value: '5',
					},
					{
						name: 'Draft',
						value: '6',
					},
				],
				default: '',
				description: 'Filter by status',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                           proposal:listComments                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Proposal ID',
		name: 'proposalId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['listComments'],
			},
		},
		description: 'The ID of the proposal',
	},

	/* -------------------------------------------------------------------------- */
	/*                               proposal:send                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Proposal ID',
		name: 'proposalId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['send'],
			},
		},
		description: 'The ID of the proposal to send',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['send'],
			},
		},
		options: [
			{
				displayName: 'Attach PDF',
				name: 'attach_pdf',
				type: 'boolean',
				default: true,
				description: 'Whether to attach the proposal PDF to the email',
			},
			{
				displayName: 'CC',
				name: 'cc',
				type: 'string',
				default: '',
				description: 'CC email addresses (comma-separated)',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              proposal:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Proposal ID',
		name: 'proposalId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['update'],
			},
		},
		description: 'The ID of the proposal',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['proposal'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Proposal address',
			},
			{
				displayName: 'Adjustment',
				name: 'adjustment',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Proposal adjustment amount',
			},
			{
				displayName: 'Allow Comments',
				name: 'allow_comments',
				type: 'boolean',
				default: true,
				description: 'Whether to allow comments on the proposal',
			},
			{
				displayName: 'Assigned',
				name: 'assigned',
				type: 'string',
				default: '',
				description: 'Assigned staff member ID',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'Proposal city',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Proposal country',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Proposal date',
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
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Proposal recipient email',
			},
			{
				displayName: 'Open Till',
				name: 'open_till',
				type: 'dateTime',
				default: '',
				description: 'Proposal open until date',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Proposal recipient phone',
			},
			{
				displayName: 'Proposal To',
				name: 'proposal_to',
				type: 'string',
				default: '',
				description: 'Proposal recipient name',
			},
			{
				displayName: 'Related ID',
				name: 'rel_id',
				type: 'string',
				default: '',
				description: 'Related item ID (used with Related Type)',
			},
			{
				displayName: 'Related Type',
				name: 'rel_type',
				type: 'options',
				options: [
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
				],
				default: 'customer',
				description: 'Related item type',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Proposal state',
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
						name: 'Declined',
						value: 2,
					},
					{
						name: 'Accepted',
						value: 3,
					},
					{
						name: 'Sent',
						value: 4,
					},
					{
						name: 'Revised',
						value: 5,
					},
					{
						name: 'Draft',
						value: 6,
					},
				],
				default: 1,
				description: 'Proposal status',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Proposal subject',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated tags',
			},
			{
				displayName: 'Zip',
				name: 'zip',
				type: 'string',
				default: '',
				description: 'Proposal zip/postal code',
			},
		],
	},
];
