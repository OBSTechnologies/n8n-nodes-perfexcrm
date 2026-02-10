import { INodeProperties } from 'n8n-workflow';

export const noteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['note'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new note',
				action: 'Create a note',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a note',
				action: 'Delete a note',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a note',
				action: 'Get a note',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many notes',
				action: 'Get many notes',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a note',
				action: 'Update a note',
			},
		],
		default: 'create',
	},
];

export const noteFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                note:create                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Related Type',
		name: 'rel_type',
		type: 'options',
		required: true,
		default: 'customer',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Contract',
				value: 'contract',
			},
			{
				name: 'Customer',
				value: 'customer',
			},
			{
				name: 'Estimate',
				value: 'estimate',
			},
			{
				name: 'Expense',
				value: 'expense',
			},
			{
				name: 'Invoice',
				value: 'invoice',
			},
			{
				name: 'Lead',
				value: 'lead',
			},
			{
				name: 'Project',
				value: 'project',
			},
			{
				name: 'Proposal',
				value: 'proposal',
			},
			{
				name: 'Staff',
				value: 'staff',
			},
			{
				name: 'Task',
				value: 'task',
			},
		],
		description: 'The type of record this note is related to',
	},
	{
		displayName: 'Related ID',
		name: 'rel_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		description: 'The ID of the related record',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		description: 'Note content',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 note:get                                   */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['get'],
			},
		},
		description: 'The ID of the note',
	},

	/* -------------------------------------------------------------------------- */
	/*                               note:getAll                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['note'],
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
				resource: ['note'],
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
				resource: ['note'],
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
				resource: ['note'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Related ID',
				name: 'rel_id',
				type: 'string',
				default: '',
				description: 'Filter by related record ID',
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
						name: 'Contract',
						value: 'contract',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Estimate',
						value: 'estimate',
					},
					{
						name: 'Expense',
						value: 'expense',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Proposal',
						value: 'proposal',
					},
					{
						name: 'Staff',
						value: 'staff',
					},
					{
						name: 'Task',
						value: 'task',
					},
				],
				default: '',
				description: 'Filter by related record type',
			},
			{
				displayName: 'Staff ID',
				name: 'staff_id',
				type: 'string',
				default: '',
				description: 'Filter by staff member ID who created the note',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                               note:update                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['update'],
			},
		},
		description: 'The ID of the note',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Note content',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                               note:delete                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the note',
	},
];
