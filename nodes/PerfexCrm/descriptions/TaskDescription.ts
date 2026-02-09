import { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Add Checklist Item',
				value: 'addChecklistItem',
				description: 'Add a checklist item to a task',
				action: 'Add checklist item to task',
			},
			{
				name: 'Add Comment',
				value: 'addComment',
				description: 'Add a comment to a task',
				action: 'Add comment to task',
			},
			{
				name: 'Add Timesheet',
				value: 'addTimesheet',
				description: 'Add a timesheet entry to a task',
				action: 'Add timesheet to task',
			},
			{
				name: 'Assign',
				value: 'assign',
				description: 'Assign a task to a staff member',
				action: 'Assign a task',
			},
			{
				name: 'Change Status',
				value: 'changeStatus',
				description: 'Change the status of a task',
				action: 'Change task status',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new task',
				action: 'Create a task',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a task',
				action: 'Delete a task',
			},
			{
				name: 'Delete Checklist Item',
				value: 'deleteChecklistItem',
				description: 'Delete a checklist item from a task',
				action: 'Delete checklist item from task',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a task',
				action: 'Get a task',
			},
			{
				name: 'Get Attachments',
				value: 'getAttachments',
				description: 'Get all attachments from a task',
				action: 'Get attachments from task',
			},
			{
				name: 'Get Checklist Item',
				value: 'getChecklistItem',
				description: 'Get a checklist item from a task',
				action: 'Get checklist item from task',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many tasks',
				action: 'Get many tasks',
			},
			{
				name: 'List Checklist',
				value: 'listChecklist',
				description: 'Get all checklist items from a task',
				action: 'Get all checklist items from task',
			},
			{
				name: 'List Comments',
				value: 'listComments',
				description: 'Get all comments from a task',
				action: 'Get all comments from task',
			},
			{
				name: 'List Timesheets',
				value: 'listTimesheets',
				description: 'Get all timesheet entries from a task',
				action: 'Get all timesheets from task',
			},
			{
				name: 'Mark Complete',
				value: 'markComplete',
				description: 'Mark a task as complete',
				action: 'Mark task as complete',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a task',
				action: 'Update a task',
			},
			{
				name: 'Update Checklist Item',
				value: 'updateChecklistItem',
				description: 'Update a checklist item on a task',
				action: 'Update checklist item on task',
			},
		],
		default: 'create',
	},
];

export const taskFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                 task:create                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		description: 'Task name',
	},
	{
		displayName: 'Start Date',
		name: 'startdate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		description: 'Task start date (YYYY-MM-DD)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Assignees',
				name: 'assignees',
				type: 'string',
				default: '',
				description: 'Comma-separated staff IDs to assign (e.g. "1,3,5")',
			},
			{
				displayName: 'Billable',
				name: 'billable',
				type: 'boolean',
				default: false,
				description: 'Whether the task is billable',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Task description',
			},
			{
				displayName: 'Due Date',
				name: 'duedate',
				type: 'dateTime',
				default: '',
				description: 'Task due date (YYYY-MM-DD)',
			},
			{
				displayName: 'Hourly Rate',
				name: 'hourly_rate',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Hourly rate for the task',
			},
			{
				displayName: 'Is Public',
				name: 'is_public',
				type: 'boolean',
				default: false,
				description: 'Whether the task is public',
			},
			{
				displayName: 'Milestone',
				name: 'milestone',
				type: 'string',
				default: '',
				description: 'Milestone ID',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 1,
					},
					{
						name: 'Medium',
						value: 2,
					},
					{
						name: 'High',
						value: 3,
					},
					{
						name: 'Urgent',
						value: 4,
					},
				],
				default: 2,
				description: 'Task priority',
			},
			{
				displayName: 'Recurring',
				name: 'recurring',
				type: 'boolean',
				default: false,
				description: 'Whether the task is recurring',
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
				type: 'string',
				default: '',
				description: 'Related item type (e.g. "project", "invoice", "customer")',
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
						name: 'Awaiting Feedback',
						value: 2,
					},
					{
						name: 'Testing',
						value: 3,
					},
					{
						name: 'In Progress',
						value: 4,
					},
					{
						name: 'Complete',
						value: 5,
					},
				],
				default: 1,
				description: 'Task status',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated tags',
			},
			{
				displayName: 'Visible to Client',
				name: 'visible_to_client',
				type: 'boolean',
				default: false,
				description: 'Whether the task is visible to the client',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                  task:get                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get'],
			},
		},
		description: 'The ID of the task',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Include Assignees',
				name: 'includeAssignees',
				type: 'boolean',
				default: false,
				description: 'Whether to include task assignees',
			},
			{
				displayName: 'Include Checklist',
				name: 'includeChecklist',
				type: 'boolean',
				default: false,
				description: 'Whether to include checklist items',
			},
			{
				displayName: 'Include Comments',
				name: 'includeComments',
				type: 'boolean',
				default: false,
				description: 'Whether to include task comments',
			},
			{
				displayName: 'Include Timesheets',
				name: 'includeTimesheets',
				type: 'boolean',
				default: false,
				description: 'Whether to include timesheet entries',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                              task:getAttachments                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAttachments'],
			},
		},
		description: 'The ID of the task',
	},

	/* -------------------------------------------------------------------------- */
	/*                                task:getAll                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['task'],
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
				resource: ['task'],
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
				resource: ['task'],
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
				resource: ['task'],
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
				displayName: 'Billed',
				name: 'billed',
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
				description: 'Filter by billed status',
			},
			{
				displayName: 'Due Date From',
				name: 'duedate_from',
				type: 'dateTime',
				default: '',
				description: 'Filter tasks with due date from this date',
			},
			{
				displayName: 'Due Date To',
				name: 'duedate_to',
				type: 'dateTime',
				default: '',
				description: 'Filter tasks with due date up to this date',
			},
			{
				displayName: 'Finished',
				name: 'finished',
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
				description: 'Filter by finished status',
			},
			{
				displayName: 'Milestone',
				name: 'milestone',
				type: 'string',
				default: '',
				description: 'Filter by milestone ID',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Low',
						value: '1',
					},
					{
						name: 'Medium',
						value: '2',
					},
					{
						name: 'High',
						value: '3',
					},
					{
						name: 'Urgent',
						value: '4',
					},
				],
				default: '',
				description: 'Filter by priority',
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
				type: 'string',
				default: '',
				description: 'Filter by related type (e.g. "project", "invoice")',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search tasks by name or description',
			},
			{
				displayName: 'Start Date From',
				name: 'startdate_from',
				type: 'dateTime',
				default: '',
				description: 'Filter tasks with start date from this date',
			},
			{
				displayName: 'Start Date To',
				name: 'startdate_to',
				type: 'dateTime',
				default: '',
				description: 'Filter tasks with start date up to this date',
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
						name: 'Awaiting Feedback',
						value: '2',
					},
					{
						name: 'Testing',
						value: '3',
					},
					{
						name: 'In Progress',
						value: '4',
					},
					{
						name: 'Complete',
						value: '5',
					},
				],
				default: '',
				description: 'Filter by status',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Filter by tags (comma-separated)',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                task:update                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['update'],
			},
		},
		description: 'The ID of the task',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Billable',
				name: 'billable',
				type: 'boolean',
				default: false,
				description: 'Whether the task is billable',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Task description',
			},
			{
				displayName: 'Due Date',
				name: 'duedate',
				type: 'dateTime',
				default: '',
				description: 'Task due date (YYYY-MM-DD)',
			},
			{
				displayName: 'Hourly Rate',
				name: 'hourly_rate',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Hourly rate for the task',
			},
			{
				displayName: 'Is Public',
				name: 'is_public',
				type: 'boolean',
				default: false,
				description: 'Whether the task is public',
			},
			{
				displayName: 'Milestone',
				name: 'milestone',
				type: 'string',
				default: '',
				description: 'Milestone ID',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Task name',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 1,
					},
					{
						name: 'Medium',
						value: 2,
					},
					{
						name: 'High',
						value: 3,
					},
					{
						name: 'Urgent',
						value: 4,
					},
				],
				default: 2,
				description: 'Task priority',
			},
			{
				displayName: 'Recurring',
				name: 'recurring',
				type: 'boolean',
				default: false,
				description: 'Whether the task is recurring',
			},
			{
				displayName: 'Related ID',
				name: 'rel_id',
				type: 'string',
				default: '',
				description: 'Related item ID',
			},
			{
				displayName: 'Related Type',
				name: 'rel_type',
				type: 'string',
				default: '',
				description: 'Related item type (e.g. "project", "invoice", "customer")',
			},
			{
				displayName: 'Start Date',
				name: 'startdate',
				type: 'dateTime',
				default: '',
				description: 'Task start date (YYYY-MM-DD)',
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
						name: 'Awaiting Feedback',
						value: 2,
					},
					{
						name: 'Testing',
						value: 3,
					},
					{
						name: 'In Progress',
						value: 4,
					},
					{
						name: 'Complete',
						value: 5,
					},
				],
				default: 1,
				description: 'Task status',
			},
			{
				displayName: 'Visible to Client',
				name: 'visible_to_client',
				type: 'boolean',
				default: false,
				description: 'Whether the task is visible to the client',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                task:delete                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the task',
	},

	/* -------------------------------------------------------------------------- */
	/*                                task:assign                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['assign'],
			},
		},
		description: 'The ID of the task',
	},
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['assign'],
			},
		},
		description: 'The ID of the staff member to assign the task to',
	},

	/* -------------------------------------------------------------------------- */
	/*                             task:changeStatus                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['changeStatus'],
			},
		},
		description: 'The ID of the task',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Not Started',
				value: 1,
			},
			{
				name: 'Awaiting Feedback',
				value: 2,
			},
			{
				name: 'Testing',
				value: 3,
			},
			{
				name: 'In Progress',
				value: 4,
			},
			{
				name: 'Complete',
				value: 5,
			},
		],
		default: 1,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['changeStatus'],
			},
		},
		description: 'The new status for the task',
	},

	/* -------------------------------------------------------------------------- */
	/*                             task:markComplete                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['markComplete'],
			},
		},
		description: 'The ID of the task',
	},

	/* -------------------------------------------------------------------------- */
	/*                             task:listComments                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listComments'],
			},
		},
		description: 'The ID of the task',
	},

	/* -------------------------------------------------------------------------- */
	/*                              task:addComment                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addComment'],
			},
		},
		description: 'The ID of the task',
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
				resource: ['task'],
				operation: ['addComment'],
			},
		},
		description: 'Comment content',
	},

	/* -------------------------------------------------------------------------- */
	/*                            task:listTimesheets                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listTimesheets'],
			},
		},
		description: 'The ID of the task',
	},

	/* -------------------------------------------------------------------------- */
	/*                             task:addTimesheet                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addTimesheet'],
			},
		},
		description: 'The ID of the task',
	},
	{
		displayName: 'Start Time',
		name: 'startTime',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addTimesheet'],
			},
		},
		description: 'Start time (Unix timestamp or datetime string like "2024-01-15 09:00:00")',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addTimesheet'],
			},
		},
		options: [
			{
				displayName: 'End Time',
				name: 'end_time',
				type: 'string',
				default: '',
				description: 'End time (Unix timestamp or datetime string)',
			},
			{
				displayName: 'Hourly Rate',
				name: 'hourly_rate',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Hourly rate override',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'Timesheet note',
			},
			{
				displayName: 'Staff ID',
				name: 'staff_id',
				type: 'string',
				default: '',
				description: 'Staff member ID (defaults to authenticated user)',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                            task:listChecklist                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listChecklist'],
			},
		},
		description: 'The ID of the task',
	},

	/* -------------------------------------------------------------------------- */
	/*                           task:addChecklistItem                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addChecklistItem'],
			},
		},
		description: 'The ID of the task',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addChecklistItem'],
			},
		},
		description: 'Checklist item description',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['addChecklistItem'],
			},
		},
		options: [
			{
				displayName: 'Finished',
				name: 'finished',
				type: 'boolean',
				default: false,
				description: 'Whether the checklist item is finished',
			},
			{
				displayName: 'List Order',
				name: 'list_order',
				type: 'number',
				default: 0,
				description: 'Order position in the checklist',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                          task:getChecklistItem                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getChecklistItem'],
			},
		},
		description: 'The ID of the task',
	},
	{
		displayName: 'Checklist Item ID',
		name: 'checklistItemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getChecklistItem'],
			},
		},
		description: 'The ID of the checklist item',
	},

	/* -------------------------------------------------------------------------- */
	/*                         task:updateChecklistItem                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateChecklistItem'],
			},
		},
		description: 'The ID of the task',
	},
	{
		displayName: 'Checklist Item ID',
		name: 'checklistItemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateChecklistItem'],
			},
		},
		description: 'The ID of the checklist item',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateChecklistItem'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Checklist item description',
			},
			{
				displayName: 'Finished',
				name: 'finished',
				type: 'boolean',
				default: false,
				description: 'Whether the checklist item is finished',
			},
			{
				displayName: 'List Order',
				name: 'list_order',
				type: 'number',
				default: 0,
				description: 'Order position in the checklist',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                         task:deleteChecklistItem                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['deleteChecklistItem'],
			},
		},
		description: 'The ID of the task',
	},
	{
		displayName: 'Checklist Item ID',
		name: 'checklistItemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['deleteChecklistItem'],
			},
		},
		description: 'The ID of the checklist item',
	},
];
