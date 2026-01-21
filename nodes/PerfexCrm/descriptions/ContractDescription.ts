import { INodeProperties } from 'n8n-workflow';

export const contractOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contract'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new contract',
				action: 'Create a contract',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a contract',
				action: 'Delete a contract',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a contract',
				action: 'Get a contract',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many contracts',
				action: 'Get many contracts',
			},
			{
				name: 'Sign',
				value: 'sign',
				description: 'Sign a contract',
				action: 'Sign a contract',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a contract',
				action: 'Update a contract',
			},
		],
		default: 'create',
	},
];

export const contractFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                contract:create                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['create'],
			},
		},
		description: 'Contract subject',
	},
	{
		displayName: 'Client ID',
		name: 'client',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['create'],
			},
		},
		description: 'Client ID',
	},
	{
		displayName: 'Start Date',
		name: 'datestart',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['create'],
			},
		},
		description: 'Contract start date',
	},
	{
		displayName: 'End Date',
		name: 'dateend',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['create'],
			},
		},
		description: 'Contract end date',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Contract Type',
				name: 'contract_type',
				type: 'string',
				default: '',
				description: 'Contract type ID',
			},
			{
				displayName: 'Contract Value',
				name: 'contract_value',
				type: 'number',
				default: 0,
				description: 'Contract value',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Contract description',
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Contract content/body',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                contract:get                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contract ID',
		name: 'contractId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['get'],
			},
		},
		description: 'The ID of the contract',
	},

	/* -------------------------------------------------------------------------- */
	/*                                contract:getAll                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['contract'],
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
				resource: ['contract'],
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
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Client ID',
				name: 'client',
				type: 'string',
				default: '',
				description: 'Filter by client ID',
			},
			{
				displayName: 'Contract Type',
				name: 'contract_type',
				type: 'string',
				default: '',
				description: 'Filter by contract type ID',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                contract:update                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contract ID',
		name: 'contractId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['update'],
			},
		},
		description: 'The ID of the contract',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Contract subject',
			},
			{
				displayName: 'Client ID',
				name: 'client',
				type: 'string',
				default: '',
				description: 'Client ID',
			},
			{
				displayName: 'Start Date',
				name: 'datestart',
				type: 'dateTime',
				default: '',
				description: 'Contract start date',
			},
			{
				displayName: 'End Date',
				name: 'dateend',
				type: 'dateTime',
				default: '',
				description: 'Contract end date',
			},
			{
				displayName: 'Contract Type',
				name: 'contract_type',
				type: 'string',
				default: '',
				description: 'Contract type ID',
			},
			{
				displayName: 'Contract Value',
				name: 'contract_value',
				type: 'number',
				default: 0,
				description: 'Contract value',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Contract description',
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Contract content/body',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                contract:delete                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contract ID',
		name: 'contractId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the contract',
	},

	/* -------------------------------------------------------------------------- */
	/*                                contract:sign                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contract ID',
		name: 'contractId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['sign'],
			},
		},
		description: 'The ID of the contract to sign',
	},
	{
		displayName: 'Signature',
		name: 'signature',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['sign'],
			},
		},
		description: 'Signature data (base64 encoded image or text)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['sign'],
			},
		},
		options: [
			{
				displayName: 'Signer Name',
				name: 'signer_name',
				type: 'string',
				default: '',
				description: 'Name of the person signing',
			},
			{
				displayName: 'Signer Email',
				name: 'signer_email',
				type: 'string',
				default: '',
				description: 'Email of the person signing',
			},
		],
	},
];
