import { INodeProperties } from 'n8n-workflow';

export const timesheetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['timesheet'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new timesheet entry',
				action: 'Create a timesheet entry',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a timesheet entry',
				action: 'Delete a timesheet entry',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a timesheet entry',
				action: 'Get a timesheet entry',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many timesheet entries',
				action: 'Get many timesheet entries',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a timesheet entry',
				action: 'Update a timesheet entry',
			},
		],
		default: 'create',
	},
];

export const timesheetFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                            timesheet:create                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'task_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['create'],
			},
		},
		description: 'The ID of the task this timesheet entry is for',
	},
	{
		displayName: 'Staff ID',
		name: 'staff_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['create'],
			},
		},
		description: 'The ID of the staff member',
	},
	{
		displayName: 'Start Time',
		name: 'start_time',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['create'],
			},
		},
		description: 'Start time of the timesheet entry',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'End Time',
				name: 'end_time',
				type: 'dateTime',
				default: '',
				description: 'End time of the timesheet entry',
			},
			{
				displayName: 'Hourly Rate',
				name: 'hourly_rate',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Hourly rate for the timesheet entry',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Note for the timesheet entry',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              timesheet:get                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Timesheet ID',
		name: 'timesheetId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['get'],
			},
		},
		description: 'The ID of the timesheet entry',
	},

	/* -------------------------------------------------------------------------- */
	/*                            timesheet:getAll                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['timesheet'],
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
				resource: ['timesheet'],
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
				resource: ['timesheet'],
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
				resource: ['timesheet'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Staff ID',
				name: 'staff_id',
				type: 'string',
				default: '',
				description: 'Filter by staff member ID',
			},
			{
				displayName: 'Task ID',
				name: 'task_id',
				type: 'string',
				default: '',
				description: 'Filter by task ID',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                            timesheet:update                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Timesheet ID',
		name: 'timesheetId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['update'],
			},
		},
		description: 'The ID of the timesheet entry',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'End Time',
				name: 'end_time',
				type: 'dateTime',
				default: '',
				description: 'End time of the timesheet entry',
			},
			{
				displayName: 'Hourly Rate',
				name: 'hourly_rate',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Hourly rate for the timesheet entry',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Note for the timesheet entry',
			},
			{
				displayName: 'Start Time',
				name: 'start_time',
				type: 'dateTime',
				default: '',
				description: 'Start time of the timesheet entry',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                            timesheet:delete                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Timesheet ID',
		name: 'timesheetId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the timesheet entry',
	},
];
