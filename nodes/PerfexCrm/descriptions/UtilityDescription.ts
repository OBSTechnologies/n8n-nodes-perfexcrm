import { INodeProperties } from 'n8n-workflow';

export const utilityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['utility'],
			},
		},
		options: [
			{
				name: 'Get Contract Types',
				value: 'getContractTypes',
				description: 'Get all contract types',
				action: 'Get all contract types',
			},
			{
				name: 'Get Countries',
				value: 'getCountries',
				description: 'Get all countries',
				action: 'Get all countries',
			},
			{
				name: 'Get Currencies',
				value: 'getCurrencies',
				description: 'Get all currencies',
				action: 'Get all currencies',
			},
			{
				name: 'Get Departments',
				value: 'getDepartments',
				description: 'Get all departments',
				action: 'Get all departments',
			},
			{
				name: 'Get Lead Sources',
				value: 'getLeadSources',
				description: 'Get all lead sources',
				action: 'Get all lead sources',
			},
			{
				name: 'Get Lead Statuses',
				value: 'getLeadStatuses',
				description: 'Get all lead statuses',
				action: 'Get all lead statuses',
			},
			{
				name: 'Get Payment Modes',
				value: 'getPaymentModes',
				description: 'Get all payment modes',
				action: 'Get all payment modes',
			},
			{
				name: 'Get Taxes',
				value: 'getTaxes',
				description: 'Get all tax rates',
				action: 'Get all tax rates',
			},
			{
				name: 'Get Ticket Priorities',
				value: 'getTicketPriorities',
				description: 'Get all ticket priorities',
				action: 'Get all ticket priorities',
			},
			{
				name: 'Get Ticket Statuses',
				value: 'getTicketStatuses',
				description: 'Get all ticket statuses',
				action: 'Get all ticket statuses',
			},
		],
		default: 'getCurrencies',
	},
];

export const utilityFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                            utility:getCountries                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['getCountries'],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search in country name, ISO2 or ISO3 code',
			},
		],
	},
];
