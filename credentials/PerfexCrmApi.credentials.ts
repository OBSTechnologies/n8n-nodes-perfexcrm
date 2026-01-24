import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PerfexCrmApi implements ICredentialType {
	name = 'perfexCrmApi';
	displayName = 'PerfexCRM API';
	documentationUrl = 'https://github.com/your-org/n8n-nodes-perfexcrm';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-perfex-instance.com',
			required: true,
			description: 'The base URL of your PerfexCRM instance',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your PerfexCRM API key (starts with pk_)',
		},
		{
			displayName: 'API Version',
			name: 'apiVersion',
			type: 'options',
			options: [
				{
					name: 'V1',
					value: 'v1',
				},
			],
			default: 'v1',
			description: 'The API version to use',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-KEY': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '=/api/{{$credentials.apiVersion}}/customers?per_page=1',
			method: 'GET',
			headers: {
				'X-API-KEY': '={{$credentials.apiKey}}',
			},
		},
	};
}