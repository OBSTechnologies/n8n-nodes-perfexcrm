import { INodeProperties } from 'n8n-workflow';

export const staffOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['staff'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate a staff member',
				action: 'Activate a staff member',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new staff member',
				action: 'Create a staff member',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Deactivate a staff member',
				action: 'Deactivate a staff member',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a staff member',
				action: 'Delete a staff member',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a staff member',
				action: 'Get a staff member',
			},
			{
				name: 'Get Department List',
				value: 'getDepartmentList',
				description: 'Get all departments',
				action: 'Get all departments',
			},
			{
				name: 'Get Departments',
				value: 'getDepartments',
				description: 'Get departments for a staff member',
				action: 'Get departments for a staff member',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many staff members',
				action: 'Get many staff members',
			},
			{
				name: 'Get Permissions',
				value: 'getPermissions',
				description: 'Get permissions for a staff member',
				action: 'Get permissions for a staff member',
			},
			{
				name: 'Get Roles',
				value: 'getRoles',
				description: 'Get all roles',
				action: 'Get all roles',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a staff member',
				action: 'Update a staff member',
			},
			{
				name: 'Change Password',
				value: 'changePassword',
				description: 'Change a staff member password',
				action: 'Change staff password',
			},
			{
				name: 'Get Tasks',
				value: 'getTasks',
				description: 'Get tasks assigned to a staff member',
				action: 'Get staff tasks',
			},
			{
				name: 'Get Timesheets',
				value: 'getTimesheets',
				description: 'Get timesheets for a staff member',
				action: 'Get staff timesheets',
			},
		],
		default: 'create',
	},
];

export const staffFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                staff:create                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['create'],
			},
		},
		description: 'First name of the staff member',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['create'],
			},
		},
		description: 'Last name of the staff member',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['create'],
			},
		},
		description: 'Email address of the staff member',
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['create'],
			},
		},
		description: 'Password for the staff member',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Admin',
				name: 'admin',
				type: 'boolean',
				default: false,
				description: 'Whether the staff member is an admin',
			},
			{
				displayName: 'Default Language',
				name: 'default_language',
				type: 'string',
				default: '',
				description: 'Default language for the staff member (e.g. "english", "greek")',
			},
			{
				displayName: 'Direction',
				name: 'direction',
				type: 'string',
				default: '',
				description: 'Text direction (e.g. "ltr", "rtl")',
			},
			{
				displayName: 'Facebook',
				name: 'facebook',
				type: 'string',
				default: '',
				description: 'Facebook profile URL',
			},
			{
				displayName: 'Hourly Rate',
				name: 'hourly_rate',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Hourly rate for the staff member',
			},
			{
				displayName: 'LinkedIn',
				name: 'linkedin',
				type: 'string',
				default: '',
				description: 'LinkedIn profile URL',
			},
			{
				displayName: 'Phone',
				name: 'phonenumber',
				type: 'string',
				default: '',
				description: 'Phone number',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				description: 'Role ID for the staff member',
			},
			{
				displayName: 'Skype',
				name: 'skype',
				type: 'string',
				default: '',
				description: 'Skype username',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                 staff:get                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['get'],
			},
		},
		description: 'The ID of the staff member',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Include Departments',
				name: 'includeDepartments',
				type: 'boolean',
				default: false,
				description: 'Whether to include staff departments',
			},
			{
				displayName: 'Include Permissions',
				name: 'includePermissions',
				type: 'boolean',
				default: false,
				description: 'Whether to include staff permissions',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                staff:getAll                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['staff'],
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
				resource: ['staff'],
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
				resource: ['staff'],
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
				resource: ['staff'],
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
						name: 'Yes',
						value: '1',
					},
					{
						name: 'No',
						value: '0',
					},
				],
				default: '',
				description: 'Filter by active status',
			},
			{
				displayName: 'Admin',
				name: 'admin',
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
				description: 'Filter by admin status',
			},
			{
				displayName: 'Department',
				name: 'department',
				type: 'string',
				default: '',
				description: 'Filter by department ID',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				description: 'Filter by role ID',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search staff by name or email',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                staff:update                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['update'],
			},
		},
		description: 'The ID of the staff member',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Default Language',
				name: 'default_language',
				type: 'string',
				default: '',
				description: 'Default language for the staff member (e.g. "english", "greek")',
			},
			{
				displayName: 'Direction',
				name: 'direction',
				type: 'string',
				default: '',
				description: 'Text direction (e.g. "ltr", "rtl")',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the staff member',
			},
			{
				displayName: 'Facebook',
				name: 'facebook',
				type: 'string',
				default: '',
				description: 'Facebook profile URL',
			},
			{
				displayName: 'First Name',
				name: 'firstname',
				type: 'string',
				default: '',
				description: 'First name of the staff member',
			},
			{
				displayName: 'Hourly Rate',
				name: 'hourly_rate',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Hourly rate for the staff member',
			},
			{
				displayName: 'Last Name',
				name: 'lastname',
				type: 'string',
				default: '',
				description: 'Last name of the staff member',
			},
			{
				displayName: 'LinkedIn',
				name: 'linkedin',
				type: 'string',
				default: '',
				description: 'LinkedIn profile URL',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'New password for the staff member',
			},
			{
				displayName: 'Phone',
				name: 'phonenumber',
				type: 'string',
				default: '',
				description: 'Phone number',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				description: 'Role ID for the staff member',
			},
			{
				displayName: 'Skype',
				name: 'skype',
				type: 'string',
				default: '',
				description: 'Skype username',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                staff:delete                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the staff member to delete',
	},
	{
		displayName: 'Transfer Data To',
		name: 'transferDataTo',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the staff member to transfer data to before deletion',
	},

	/* -------------------------------------------------------------------------- */
	/*                               staff:activate                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['activate'],
			},
		},
		description: 'The ID of the staff member to activate',
	},

	/* -------------------------------------------------------------------------- */
	/*                              staff:deactivate                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['deactivate'],
			},
		},
		description: 'The ID of the staff member to deactivate',
	},

	/* -------------------------------------------------------------------------- */
	/*                            staff:getPermissions                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['getPermissions'],
			},
		},
		description: 'The ID of the staff member',
	},

	/* -------------------------------------------------------------------------- */
	/*                            staff:getDepartments                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['getDepartments'],
			},
		},
		description: 'The ID of the staff member',
	},

	/* -------------------------------------------------------------------------- */
	/*                              staff:getRoles                                */
	/* -------------------------------------------------------------------------- */
	// No additional fields required

	/* -------------------------------------------------------------------------- */
	/*                          staff:getDepartmentList                           */
	/* -------------------------------------------------------------------------- */
	// No additional fields required

	/* -------------------------------------------------------------------------- */
	/*                           staff:changePassword                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['changePassword'],
			},
		},
		description: 'The ID of the staff member',
	},
	{
		displayName: 'New Password',
		name: 'newPassword',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['changePassword'],
			},
		},
		description: 'New password for the staff member',
	},
	{
		displayName: 'Confirm Password',
		name: 'confirmPassword',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['changePassword'],
			},
		},
		description: 'Confirm the new password',
	},

	/* -------------------------------------------------------------------------- */
	/*                             staff:getTasks                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['getTasks'],
			},
		},
		description: 'The ID of the staff member',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['getTasks'],
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
				resource: ['staff'],
				operation: ['getTasks'],
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
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['getTasks'],
			},
		},
		options: [
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
				description: 'Filter by task status',
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
				description: 'Filter by task priority',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                           staff:getTimesheets                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Staff ID',
		name: 'staffId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['getTimesheets'],
			},
		},
		description: 'The ID of the staff member',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['getTimesheets'],
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
				resource: ['staff'],
				operation: ['getTimesheets'],
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
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['getTimesheets'],
			},
		},
		options: [
			{
				displayName: 'Task ID',
				name: 'task_id',
				type: 'string',
				default: '',
				description: 'Filter by task ID',
			},
			{
				displayName: 'Date From',
				name: 'date_from',
				type: 'dateTime',
				default: '',
				description: 'Filter timesheets from this date',
			},
			{
				displayName: 'Date To',
				name: 'date_to',
				type: 'dateTime',
				default: '',
				description: 'Filter timesheets up to this date',
			},
		],
	},
];
