import { INodeProperties } from 'n8n-workflow';

export const projectOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['project'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new project',
				action: 'Create a project',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a project',
				action: 'Delete a project',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a project',
				action: 'Get a project',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many projects',
				action: 'Get many projects',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a project',
				action: 'Update a project',
			},
		],
		default: 'create',
	},
];

export const projectFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                project:create                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create'],
			},
		},
		description: 'Project name',
	},
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create'],
			},
		},
		description: 'Client ID',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create'],
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
				description: 'Project description',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Not Started',
						value: 1,
					},
					{
						name: 'In Progress',
						value: 2,
					},
					{
						name: 'On Hold',
						value: 3,
					},
					{
						name: 'Cancelled',
						value: 4,
					},
					{
						name: 'Finished',
						value: 5,
					},
				],
				default: 1,
				description: 'Project status',
			},
			{
				displayName: 'Billing Type',
				name: 'billing_type',
				type: 'options',
				options: [
					{
						name: 'Fixed Rate',
						value: 1,
					},
					{
						name: 'Project Hours',
						value: 2,
					},
					{
						name: 'Task Hours',
						value: 3,
					},
				],
				default: 1,
				description: 'Project billing type',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Project start date',
			},
			{
				displayName: 'Deadline',
				name: 'deadline',
				type: 'dateTime',
				default: '',
				description: 'Project deadline',
			},
			{
				displayName: 'Project Cost',
				name: 'project_cost',
				type: 'number',
				default: 0,
				description: 'Total project cost',
			},
			{
				displayName: 'Project Rate Per Hour',
				name: 'project_rate_per_hour',
				type: 'number',
				default: 0,
				description: 'Hourly rate for project',
			},
			{
				displayName: 'Estimated Hours',
				name: 'estimated_hours',
				type: 'number',
				default: 0,
				description: 'Estimated hours for project',
			},
			{
				displayName: 'Progress',
				name: 'progress',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
				default: 0,
				description: 'Project progress percentage (0-100)',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                project:get                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['get'],
			},
		},
		description: 'The ID of the project',
	},

	/* -------------------------------------------------------------------------- */
	/*                                project:getAll                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['project'],
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
				resource: ['project'],
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
				resource: ['project'],
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
				resource: ['project'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Client ID',
				name: 'clientid',
				type: 'string',
				default: '',
				description: 'Filter by client ID',
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
						name: 'Not Started',
						value: '1',
					},
					{
						name: 'In Progress',
						value: '2',
					},
					{
						name: 'On Hold',
						value: '3',
					},
					{
						name: 'Cancelled',
						value: '4',
					},
					{
						name: 'Finished',
						value: '5',
					},
				],
				default: '',
				description: 'Filter by status',
			},
			{
				displayName: 'Billing Type',
				name: 'billing_type',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Fixed Rate',
						value: '1',
					},
					{
						name: 'Project Hours',
						value: '2',
					},
					{
						name: 'Task Hours',
						value: '3',
					},
				],
				default: '',
				description: 'Filter by billing type',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                project:update                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['update'],
			},
		},
		description: 'The ID of the project',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Project name',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Project description',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Not Started',
						value: 1,
					},
					{
						name: 'In Progress',
						value: 2,
					},
					{
						name: 'On Hold',
						value: 3,
					},
					{
						name: 'Cancelled',
						value: 4,
					},
					{
						name: 'Finished',
						value: 5,
					},
				],
				default: 1,
				description: 'Project status',
			},
			{
				displayName: 'Billing Type',
				name: 'billing_type',
				type: 'options',
				options: [
					{
						name: 'Fixed Rate',
						value: 1,
					},
					{
						name: 'Project Hours',
						value: 2,
					},
					{
						name: 'Task Hours',
						value: 3,
					},
				],
				default: 1,
				description: 'Project billing type',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Project start date',
			},
			{
				displayName: 'Deadline',
				name: 'deadline',
				type: 'dateTime',
				default: '',
				description: 'Project deadline',
			},
			{
				displayName: 'Project Cost',
				name: 'project_cost',
				type: 'number',
				default: 0,
				description: 'Total project cost',
			},
			{
				displayName: 'Project Rate Per Hour',
				name: 'project_rate_per_hour',
				type: 'number',
				default: 0,
				description: 'Hourly rate for project',
			},
			{
				displayName: 'Estimated Hours',
				name: 'estimated_hours',
				type: 'number',
				default: 0,
				description: 'Estimated hours for project',
			},
			{
				displayName: 'Progress',
				name: 'progress',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
				default: 0,
				description: 'Project progress percentage (0-100)',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                project:delete                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the project',
	},
];
