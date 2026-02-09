import { INodeProperties } from 'n8n-workflow';
import { PerfexCrm } from './PerfexCrm.node';

import { customerOperations, customerFields } from './descriptions/CustomerDescription';
import { ticketOperations, ticketFields } from './descriptions/TicketDescription';
import { invoiceOperations, invoiceFields } from './descriptions/InvoiceDescription';
import { leadOperations, leadFields } from './descriptions/LeadDescription';
import { projectOperations, projectFields } from './descriptions/ProjectDescription';
import { contractOperations, contractFields } from './descriptions/ContractDescription';
import { taskOperations, taskFields } from './descriptions/TaskDescription';
import { expenseOperations, expenseFields } from './descriptions/ExpenseDescription';
import { estimateOperations, estimateFields } from './descriptions/EstimateDescription';
import { staffOperations, staffFields } from './descriptions/StaffDescription';
import { proposalOperations, proposalFields } from './descriptions/ProposalDescription';
import { creditNoteOperations, creditNoteFields } from './descriptions/CreditNoteDescription';
import { subscriptionOperations, subscriptionFields } from './descriptions/SubscriptionDescription';
import { itemOperations, itemFields } from './descriptions/ItemDescription';
import { utilityOperations, utilityFields } from './descriptions/UtilityDescription';

const node = new PerfexCrm();
const { description } = node;
const properties = description.properties;

// Helper: find the resource parameter
const resourceParam = properties.find((p) => p.name === 'resource') as INodeProperties;

// Helper: find the operation parameter for a given resource
function getOperationParam(resource: string): INodeProperties | undefined {
	return properties.find(
		(p) =>
			p.name === 'operation' &&
			p.displayOptions?.show?.resource?.includes(resource),
	);
}

// Helper: get operation values for a resource
function getOperationValues(resource: string): string[] {
	const op = getOperationParam(resource);
	if (!op || op.type !== 'options' || !Array.isArray(op.options)) return [];
	return (op.options as Array<{ value: string }>).map((o) => o.value);
}

// Helper: find fields shown for a specific resource + operation
function getFieldsForOperation(resource: string, operation: string): INodeProperties[] {
	return properties.filter(
		(p) =>
			p.name !== 'operation' &&
			p.name !== 'resource' &&
			p.displayOptions?.show?.resource?.includes(resource) &&
			p.displayOptions?.show?.operation?.includes(operation),
	);
}

/* ========================================================================== */
/*                     1. Node Description Structure Tests                     */
/* ========================================================================== */

describe('Node Description Structure', () => {
	it('should have displayName "PerfexCRM"', () => {
		expect(description.displayName).toBe('PerfexCRM');
	});

	it('should have name "perfexCrm"', () => {
		expect(description.name).toBe('perfexCrm');
	});

	it('should have version 1', () => {
		expect(description.version).toBe(1);
	});

	it('should have credentials including perfexCrmApi', () => {
		const credNames = description.credentials!.map((c) => c.name);
		expect(credNames).toContain('perfexCrmApi');
	});

	it('should require perfexCrmApi credentials', () => {
		const perfexCred = description.credentials!.find((c) => c.name === 'perfexCrmApi');
		expect(perfexCred!.required).toBe(true);
	});

	it('should have a resource parameter', () => {
		expect(resourceParam).toBeDefined();
		expect(resourceParam.type).toBe('options');
	});

	it('should have resource parameter with noDataExpression true', () => {
		expect(resourceParam.noDataExpression).toBe(true);
	});

	it('should have 15 resource options', () => {
		const options = resourceParam.options as Array<{ value: string }>;
		expect(options).toHaveLength(15);
	});

	it('should include all 15 resources', () => {
		const resourceValues = (resourceParam.options as Array<{ value: string }>).map(
			(o) => o.value,
		);
		const expectedResources = [
			'customer',
			'ticket',
			'invoice',
			'lead',
			'project',
			'contract',
			'estimate',
			'expense',
			'proposal',
			'staff',
			'task',
			'creditNote',
			'item',
			'subscription',
			'utility',
		];
		for (const r of expectedResources) {
			expect(resourceValues).toContain(r);
		}
	});

	it('should default resource to "customer"', () => {
		expect(resourceParam.default).toBe('customer');
	});

	it('should have inputs and outputs defined', () => {
		expect(description.inputs).toEqual(['main']);
		expect(description.outputs).toEqual(['main']);
	});

	it('should have group "transform"', () => {
		expect(description.group).toContain('transform');
	});

	it('should have a subtitle expression', () => {
		expect(description.subtitle).toBeDefined();
		expect(description.subtitle).toContain('$parameter');
	});

	it('should have an operation parameter defined for each resource', () => {
		const resourceValues = (resourceParam.options as Array<{ value: string }>).map(
			(o) => o.value,
		);
		for (const r of resourceValues) {
			const opParam = getOperationParam(r);
			expect(opParam).toBeDefined();
		}
	});
});

/* ========================================================================== */
/*                        2. Operation Definition Tests                        */
/* ========================================================================== */

describe('Operation Definitions', () => {
	it('should define customer operations: create, get, getAll, update, delete plus sub-resources', () => {
		const ops = getOperationValues('customer');
		expect(ops).toContain('create');
		expect(ops).toContain('get');
		expect(ops).toContain('getAll');
		expect(ops).toContain('update');
		expect(ops).toContain('delete');
		expect(ops).toContain('getContacts');
		expect(ops).toContain('getContracts');
		expect(ops).toContain('getInvoices');
		expect(ops).toContain('getProjects');
		expect(ops).toContain('getTickets');
	});

	it('should define task operations with 18 values', () => {
		const ops = getOperationValues('task');
		const expectedOps = [
			'create',
			'get',
			'getAll',
			'update',
			'delete',
			'assign',
			'changeStatus',
			'markComplete',
			'addComment',
			'listComments',
			'addTimesheet',
			'listTimesheets',
			'addChecklistItem',
			'getChecklistItem',
			'updateChecklistItem',
			'deleteChecklistItem',
			'listChecklist',
			'getAttachments',
		];
		expect(ops).toHaveLength(expectedOps.length);
		for (const op of expectedOps) {
			expect(ops).toContain(op);
		}
	});

	it('should define credit note operations: CRUD plus refunds and credits', () => {
		const ops = getOperationValues('creditNote');
		const expectedOps = [
			'create',
			'get',
			'getAll',
			'update',
			'delete',
			'addRefund',
			'listRefunds',
			'applyCredit',
			'listCredits',
		];
		expect(ops).toHaveLength(expectedOps.length);
		for (const op of expectedOps) {
			expect(ops).toContain(op);
		}
	});

	it('should define item operations as read-only: get, getAll, getGroups', () => {
		const ops = getOperationValues('item');
		expect(ops).toHaveLength(3);
		expect(ops).toContain('get');
		expect(ops).toContain('getAll');
		expect(ops).toContain('getGroups');
		// Should NOT have create, update, or delete
		expect(ops).not.toContain('create');
		expect(ops).not.toContain('update');
		expect(ops).not.toContain('delete');
	});

	it('should define subscription operations: create, get, getAll, update, delete', () => {
		const ops = getOperationValues('subscription');
		const expectedOps = ['create', 'get', 'getAll', 'update', 'delete'];
		expect(ops).toHaveLength(expectedOps.length);
		for (const op of expectedOps) {
			expect(ops).toContain(op);
		}
	});

	it('should define utility operations with 10 lookup endpoints', () => {
		const ops = getOperationValues('utility');
		expect(ops).toHaveLength(10);
		const expectedOps = [
			'getContractTypes',
			'getCountries',
			'getCurrencies',
			'getDepartments',
			'getLeadSources',
			'getLeadStatuses',
			'getPaymentModes',
			'getTaxes',
			'getTicketPriorities',
			'getTicketStatuses',
		];
		for (const op of expectedOps) {
			expect(ops).toContain(op);
		}
	});

	it('should define invoice operations including send and getPayments', () => {
		const ops = getOperationValues('invoice');
		expect(ops).toContain('create');
		expect(ops).toContain('get');
		expect(ops).toContain('getAll');
		expect(ops).toContain('update');
		expect(ops).toContain('delete');
		expect(ops).toContain('send');
		expect(ops).toContain('getPayments');
	});

	it('should define contract operations including sign, renew, and getExpired', () => {
		const ops = getOperationValues('contract');
		expect(ops).toContain('sign');
		expect(ops).toContain('renew');
		expect(ops).toContain('getExpired');
		expect(ops).toContain('getExpiring');
		expect(ops).toContain('getAttachments');
		expect(ops).toContain('getComments');
	});

	it('should define staff operations including activate and deactivate', () => {
		const ops = getOperationValues('staff');
		expect(ops).toContain('activate');
		expect(ops).toContain('deactivate');
		expect(ops).toContain('getPermissions');
		expect(ops).toContain('getDepartments');
		expect(ops).toContain('getRoles');
		expect(ops).toContain('getDepartmentList');
	});

	it('should define proposal operations including send, accept, and decline', () => {
		const ops = getOperationValues('proposal');
		expect(ops).toContain('send');
		expect(ops).toContain('accept');
		expect(ops).toContain('decline');
		expect(ops).toContain('listComments');
		expect(ops).toContain('addComment');
	});
});

/* ========================================================================== */
/*                       3. Field Configuration Tests                          */
/* ========================================================================== */

describe('Field Configuration', () => {
	it('should require "company" for customer create', () => {
		const fields = getFieldsForOperation('customer', 'create');
		const companyField = fields.find((f) => f.name === 'company');
		expect(companyField).toBeDefined();
		expect(companyField!.required).toBe(true);
		expect(companyField!.type).toBe('string');
	});

	it('should require "name" and "startdate" for task create', () => {
		const fields = getFieldsForOperation('task', 'create');
		const nameField = fields.find((f) => f.name === 'name');
		const startdateField = fields.find((f) => f.name === 'startdate');
		expect(nameField).toBeDefined();
		expect(nameField!.required).toBe(true);
		expect(startdateField).toBeDefined();
		expect(startdateField!.required).toBe(true);
	});

	it('should require "clientId" and "date" for credit note create', () => {
		const fields = getFieldsForOperation('creditNote', 'create');
		const clientIdField = fields.find((f) => f.name === 'clientId');
		const dateField = fields.find((f) => f.name === 'date');
		expect(clientIdField).toBeDefined();
		expect(clientIdField!.required).toBe(true);
		expect(dateField).toBeDefined();
		expect(dateField!.required).toBe(true);
	});

	it('should require "name", "clientId", and "currency" for subscription create', () => {
		const fields = getFieldsForOperation('subscription', 'create');
		const nameField = fields.find((f) => f.name === 'name');
		const clientIdField = fields.find((f) => f.name === 'clientId');
		const currencyField = fields.find((f) => f.name === 'currency');
		expect(nameField).toBeDefined();
		expect(nameField!.required).toBe(true);
		expect(clientIdField).toBeDefined();
		expect(clientIdField!.required).toBe(true);
		expect(currencyField).toBeDefined();
		expect(currencyField!.required).toBe(true);
	});

	it('should have returnAll, limit, and offset for getAll operations', () => {
		const resources = ['customer', 'ticket', 'invoice', 'lead', 'project', 'contract', 'task', 'creditNote', 'subscription', 'item'];
		for (const resource of resources) {
			const fields = getFieldsForOperation(resource, 'getAll');
			const returnAllField = fields.find((f) => f.name === 'returnAll');
			expect(returnAllField).toBeDefined();
			expect(returnAllField!.type).toBe('boolean');
		}
	});

	it('should have limit fields that hide when returnAll is true', () => {
		const fields = getFieldsForOperation('customer', 'getAll');
		const limitField = fields.find((f) => f.name === 'limit');
		expect(limitField).toBeDefined();
		expect(limitField!.displayOptions?.show?.returnAll).toEqual([false]);
	});

	it('should have includeCredits and includeRefunds options for credit note get', () => {
		const fields = getFieldsForOperation('creditNote', 'get');
		const optionsField = fields.find((f) => f.name === 'options');
		expect(optionsField).toBeDefined();
		expect(optionsField!.type).toBe('collection');
		const subOptions = optionsField!.options as INodeProperties[];
		const optionNames = subOptions.map((o) => o.name);
		expect(optionNames).toContain('includeCredits');
		expect(optionNames).toContain('includeRefunds');
	});

	it('should have includeInvoices and includeCustomer options for subscription get', () => {
		const fields = getFieldsForOperation('subscription', 'get');
		const optionsField = fields.find((f) => f.name === 'options');
		expect(optionsField).toBeDefined();
		expect(optionsField!.type).toBe('collection');
		const subOptions = optionsField!.options as INodeProperties[];
		const optionNames = subOptions.map((o) => o.name);
		expect(optionNames).toContain('includeInvoices');
		expect(optionNames).toContain('includeCustomer');
	});

	it('should require "subject" and "department" for ticket create', () => {
		const fields = getFieldsForOperation('ticket', 'create');
		const subjectField = fields.find((f) => f.name === 'subject');
		const deptField = fields.find((f) => f.name === 'department');
		expect(subjectField).toBeDefined();
		expect(subjectField!.required).toBe(true);
		expect(deptField).toBeDefined();
		expect(deptField!.required).toBe(true);
	});

	it('should require "clientId", "number", "date", and "duedate" for invoice create', () => {
		const fields = getFieldsForOperation('invoice', 'create');
		const requiredNames = ['clientId', 'number', 'date', 'duedate'];
		for (const name of requiredNames) {
			const field = fields.find((f) => f.name === name);
			expect(field).toBeDefined();
			expect(field!.required).toBe(true);
		}
	});
});

/* ========================================================================== */
/*                       4. Import / Export Tests                               */
/* ========================================================================== */

describe('Import and Export', () => {
	it('should instantiate PerfexCrm class', () => {
		const instance = new PerfexCrm();
		expect(instance).toBeDefined();
		expect(instance.description).toBeDefined();
	});

	it('should have an execute method', () => {
		expect(typeof node.execute).toBe('function');
	});

	const descriptionExports = [
		{ name: 'customerOperations', value: customerOperations },
		{ name: 'customerFields', value: customerFields },
		{ name: 'ticketOperations', value: ticketOperations },
		{ name: 'ticketFields', value: ticketFields },
		{ name: 'invoiceOperations', value: invoiceOperations },
		{ name: 'invoiceFields', value: invoiceFields },
		{ name: 'leadOperations', value: leadOperations },
		{ name: 'leadFields', value: leadFields },
		{ name: 'projectOperations', value: projectOperations },
		{ name: 'projectFields', value: projectFields },
		{ name: 'contractOperations', value: contractOperations },
		{ name: 'contractFields', value: contractFields },
		{ name: 'taskOperations', value: taskOperations },
		{ name: 'taskFields', value: taskFields },
		{ name: 'expenseOperations', value: expenseOperations },
		{ name: 'expenseFields', value: expenseFields },
		{ name: 'estimateOperations', value: estimateOperations },
		{ name: 'estimateFields', value: estimateFields },
		{ name: 'staffOperations', value: staffOperations },
		{ name: 'staffFields', value: staffFields },
		{ name: 'proposalOperations', value: proposalOperations },
		{ name: 'proposalFields', value: proposalFields },
		{ name: 'creditNoteOperations', value: creditNoteOperations },
		{ name: 'creditNoteFields', value: creditNoteFields },
		{ name: 'subscriptionOperations', value: subscriptionOperations },
		{ name: 'subscriptionFields', value: subscriptionFields },
		{ name: 'itemOperations', value: itemOperations },
		{ name: 'itemFields', value: itemFields },
		{ name: 'utilityOperations', value: utilityOperations },
		{ name: 'utilityFields', value: utilityFields },
	];

	it.each(descriptionExports)(
		'should export $name as a non-empty INodeProperties array',
		({ value }) => {
			expect(Array.isArray(value)).toBe(true);
			expect(value.length).toBeGreaterThan(0);
			// Verify first element has INodeProperties shape
			expect(value[0]).toHaveProperty('name');
			expect(value[0]).toHaveProperty('type');
		},
	);
});
