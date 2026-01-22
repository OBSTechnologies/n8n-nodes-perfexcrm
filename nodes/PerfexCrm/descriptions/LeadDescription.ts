import { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lead'],
			},
		},
		options: [
			{
				name: 'Convert',
				value: 'convert',
				description: 'Convert a lead to a customer',
				action: 'Convert a lead',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new lead',
				action: 'Create a lead',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a lead',
				action: 'Delete a lead',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a lead',
				action: 'Get a lead',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many leads',
				action: 'Get many leads',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a lead',
				action: 'Update a lead',
			},
		],
		default: 'create',
	},
];

export const leadFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                lead:create                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		description: 'Lead name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Lead title/position',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Lead email address',
			},
			{
				displayName: 'Phone',
				name: 'phonenumber',
				type: 'string',
				default: '',
				description: 'Lead phone number',
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				description: 'Lead company name',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Lead description',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Lead status ID',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Lead source ID',
			},
			{
				displayName: 'Assigned',
				name: 'assigned',
				type: 'string',
				default: '',
				description: 'Staff ID to assign lead to',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Country',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State',
			},
			{
				displayName: 'Zip',
				name: 'zip',
				type: 'string',
				default: '',
				description: 'Zip code',
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Address',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website URL',
			},
			{
				displayName: 'Lead Value',
				name: 'lead_value',
				type: 'number',
				default: 0,
				description: 'Estimated lead value',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                lead:get                                    */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['get'],
			},
		},
		description: 'The ID of the lead',
	},

	/* -------------------------------------------------------------------------- */
	/*                                lead:getAll                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Filter by status ID',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Filter by source ID',
			},
			{
				displayName: 'Assigned',
				name: 'assigned',
				type: 'string',
				default: '',
				description: 'Filter by assigned staff ID',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                lead:update                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['update'],
			},
		},
		description: 'The ID of the lead',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Lead name',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Lead title/position',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Lead email address',
			},
			{
				displayName: 'Phone',
				name: 'phonenumber',
				type: 'string',
				default: '',
				description: 'Lead phone number',
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				description: 'Lead company name',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Lead description',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Lead status ID',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Lead source ID',
			},
			{
				displayName: 'Assigned',
				name: 'assigned',
				type: 'string',
				default: '',
				description: 'Staff ID to assign lead to',
			},
			{
				displayName: 'Lead Value',
				name: 'lead_value',
				type: 'number',
				default: 0,
				description: 'Estimated lead value',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                lead:delete                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the lead',
	},

	/* -------------------------------------------------------------------------- */
	/*                                lead:convert                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['convert'],
			},
		},
		description: 'The ID of the lead to convert to a customer',
	},
];
