import { INode } from 'n8n-workflow';
import {
	validateAndFormatDate,
	validateEmail,
	validateNonNegativeNumber,
	validateNumericId,
	validateAndFormatDateFields,
	validateEmailFields,
	validateNonNegativeFields,
} from './validation';

// Mock INode for testing
const mockNode: INode = {
	id: 'test-node-id',
	name: 'Test Node',
	type: 'n8n-nodes-perfexcrm.perfexCrm',
	typeVersion: 1,
	position: [0, 0],
	parameters: {},
};

describe('validateAndFormatDate', () => {
	it('should accept and return a valid YYYY-MM-DD date', () => {
		expect(validateAndFormatDate(mockNode, '2024-01-15', 'Date', 0)).toBe('2024-01-15');
	});

	it('should accept and return a valid YYYY-MM-DD date with leading zeros', () => {
		expect(validateAndFormatDate(mockNode, '2024-03-05', 'Date', 0)).toBe('2024-03-05');
	});

	it('should normalize an ISO 8601 date to YYYY-MM-DD', () => {
		const result = validateAndFormatDate(mockNode, '2024-01-15T00:00:00.000Z', 'Date', 0);
		expect(result).toBe('2024-01-15');
	});

	it('should normalize an ISO 8601 date with time to YYYY-MM-DD', () => {
		const result = validateAndFormatDate(mockNode, '2024-06-30T14:30:00Z', 'Date', 0);
		// Note: the exact day may vary by timezone, but format should be correct
		expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});

	it('should throw on an empty string', () => {
		expect(() => validateAndFormatDate(mockNode, '', 'Date', 0)).toThrow(
			'requires a valid date',
		);
	});

	it('should throw on a whitespace-only string', () => {
		expect(() => validateAndFormatDate(mockNode, '   ', 'Date', 0)).toThrow(
			'requires a valid date',
		);
	});

	it('should throw on an invalid date string', () => {
		expect(() => validateAndFormatDate(mockNode, 'not-a-date', 'Date', 0)).toThrow(
			'invalid date',
		);
	});

	it('should throw on an invalid month', () => {
		expect(() => validateAndFormatDate(mockNode, '2024-13-01', 'Date', 0)).toThrow(
			'invalid date',
		);
	});

	it('should throw on an invalid day', () => {
		expect(() => validateAndFormatDate(mockNode, '2024-01-32', 'Date', 0)).toThrow(
			'invalid date',
		);
	});

	it('should throw on month 00', () => {
		expect(() => validateAndFormatDate(mockNode, '2024-00-15', 'Date', 0)).toThrow(
			'invalid date',
		);
	});

	it('should include the field name in the error message', () => {
		expect(() => validateAndFormatDate(mockNode, 'bad', 'Due Date', 0)).toThrow(
			'"Due Date"',
		);
	});

	it('should accept a date with full ISO 8601 with timezone offset', () => {
		const result = validateAndFormatDate(mockNode, '2024-12-25T10:00:00+02:00', 'Date', 0);
		expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});

describe('validateEmail', () => {
	it('should accept a valid email', () => {
		expect(() => validateEmail(mockNode, 'user@example.com', 'Email', 0)).not.toThrow();
	});

	it('should accept an email with subdomain', () => {
		expect(() => validateEmail(mockNode, 'user@sub.example.com', 'Email', 0)).not.toThrow();
	});

	it('should accept an email with plus alias', () => {
		expect(() => validateEmail(mockNode, 'user+tag@example.com', 'Email', 0)).not.toThrow();
	});

	it('should skip validation for empty string (optional field)', () => {
		expect(() => validateEmail(mockNode, '', 'Email', 0)).not.toThrow();
	});

	it('should skip validation for undefined-like values', () => {
		expect(() => validateEmail(mockNode, undefined as unknown as string, 'Email', 0)).not.toThrow();
	});

	it('should throw on email without @', () => {
		expect(() => validateEmail(mockNode, 'not-an-email', 'Email', 0)).toThrow(
			'invalid email address',
		);
	});

	it('should throw on email without domain', () => {
		expect(() => validateEmail(mockNode, 'user@', 'Email', 0)).toThrow(
			'invalid email address',
		);
	});

	it('should throw on email without TLD', () => {
		expect(() => validateEmail(mockNode, 'user@domain', 'Email', 0)).toThrow(
			'invalid email address',
		);
	});

	it('should throw on email with spaces', () => {
		expect(() => validateEmail(mockNode, 'user @example.com', 'Email', 0)).toThrow(
			'invalid email address',
		);
	});

	it('should include the field name in the error message', () => {
		expect(() => validateEmail(mockNode, 'bad', 'Signer Email', 0)).toThrow(
			'"Signer Email"',
		);
	});
});

describe('validateNonNegativeNumber', () => {
	it('should accept zero', () => {
		expect(() => validateNonNegativeNumber(mockNode, 0, 'Total', 0)).not.toThrow();
	});

	it('should accept a positive number', () => {
		expect(() => validateNonNegativeNumber(mockNode, 100.5, 'Total', 0)).not.toThrow();
	});

	it('should accept a positive integer', () => {
		expect(() => validateNonNegativeNumber(mockNode, 42, 'Total', 0)).not.toThrow();
	});

	it('should accept a string number', () => {
		expect(() => validateNonNegativeNumber(mockNode, '100', 'Total', 0)).not.toThrow();
	});

	it('should skip validation for undefined', () => {
		expect(() => validateNonNegativeNumber(mockNode, undefined, 'Total', 0)).not.toThrow();
	});

	it('should skip validation for null', () => {
		expect(() => validateNonNegativeNumber(mockNode, null, 'Total', 0)).not.toThrow();
	});

	it('should skip validation for empty string', () => {
		expect(() => validateNonNegativeNumber(mockNode, '', 'Total', 0)).not.toThrow();
	});

	it('should throw on a negative number', () => {
		expect(() => validateNonNegativeNumber(mockNode, -5, 'Total', 0)).toThrow(
			'non-negative number',
		);
	});

	it('should throw on a negative decimal', () => {
		expect(() => validateNonNegativeNumber(mockNode, -0.01, 'Subtotal', 0)).toThrow(
			'non-negative number',
		);
	});

	it('should throw on NaN string', () => {
		expect(() => validateNonNegativeNumber(mockNode, 'abc', 'Total', 0)).toThrow(
			'valid number',
		);
	});

	it('should include the field name in the error message', () => {
		expect(() => validateNonNegativeNumber(mockNode, -1, 'Contract Value', 0)).toThrow(
			'"Contract Value"',
		);
	});
});

describe('validateNumericId', () => {
	it('should accept a valid positive integer string', () => {
		expect(() => validateNumericId(mockNode, '1', 'Customer ID', 0)).not.toThrow();
	});

	it('should accept a large ID', () => {
		expect(() => validateNumericId(mockNode, '99999', 'Customer ID', 0)).not.toThrow();
	});

	it('should skip validation for empty string', () => {
		expect(() => validateNumericId(mockNode, '', 'Customer ID', 0)).not.toThrow();
	});

	it('should throw on zero', () => {
		expect(() => validateNumericId(mockNode, '0', 'Customer ID', 0)).toThrow(
			'positive integer ID',
		);
	});

	it('should throw on negative number', () => {
		expect(() => validateNumericId(mockNode, '-1', 'Customer ID', 0)).toThrow(
			'positive integer ID',
		);
	});

	it('should throw on decimal', () => {
		expect(() => validateNumericId(mockNode, '1.5', 'Customer ID', 0)).toThrow(
			'positive integer ID',
		);
	});

	it('should throw on non-numeric string', () => {
		expect(() => validateNumericId(mockNode, 'abc', 'Customer ID', 0)).toThrow(
			'positive integer ID',
		);
	});

	it('should include the field name in the error message', () => {
		expect(() => validateNumericId(mockNode, 'bad', 'Staff ID', 0)).toThrow(
			'"Staff ID"',
		);
	});
});

describe('validateAndFormatDateFields', () => {
	it('should normalize date fields in a data object', () => {
		const data: Record<string, unknown> = {
			start_date: '2024-06-15T00:00:00.000Z',
			deadline: '2024-12-31',
			name: 'Test Project',
		};

		validateAndFormatDateFields(mockNode, data, ['start_date', 'deadline'], 0);

		expect(data.start_date).toBe('2024-06-15');
		expect(data.deadline).toBe('2024-12-31');
		expect(data.name).toBe('Test Project'); // Non-date fields untouched
	});

	it('should skip absent fields', () => {
		const data: Record<string, unknown> = { name: 'Test' };

		expect(() => validateAndFormatDateFields(mockNode, data, ['start_date', 'deadline'], 0)).not.toThrow();
	});

	it('should throw on invalid date field', () => {
		const data: Record<string, unknown> = { start_date: 'not-a-date' };

		expect(() => validateAndFormatDateFields(mockNode, data, ['start_date'], 0)).toThrow(
			'invalid date',
		);
	});
});

describe('validateEmailFields', () => {
	it('should validate email fields in a data object', () => {
		const data: Record<string, unknown> = {
			email: 'valid@example.com',
			name: 'Test',
		};

		expect(() => validateEmailFields(mockNode, data, ['email'], 0)).not.toThrow();
	});

	it('should throw on invalid email in data object', () => {
		const data: Record<string, unknown> = { email: 'invalid' };

		expect(() => validateEmailFields(mockNode, data, ['email'], 0)).toThrow(
			'invalid email address',
		);
	});

	it('should skip absent email fields', () => {
		const data: Record<string, unknown> = { name: 'Test' };

		expect(() => validateEmailFields(mockNode, data, ['email'], 0)).not.toThrow();
	});
});

describe('validateNonNegativeFields', () => {
	it('should validate numeric fields in a data object', () => {
		const data: Record<string, unknown> = {
			total: 100,
			subtotal: 80,
		};

		expect(() => validateNonNegativeFields(mockNode, data, ['total', 'subtotal'], 0)).not.toThrow();
	});

	it('should throw on negative value in data object', () => {
		const data: Record<string, unknown> = { total: -5 };

		expect(() => validateNonNegativeFields(mockNode, data, ['total'], 0)).toThrow(
			'non-negative number',
		);
	});

	it('should skip absent fields', () => {
		const data: Record<string, unknown> = { name: 'Test' };

		expect(() => validateNonNegativeFields(mockNode, data, ['total', 'subtotal'], 0)).not.toThrow();
	});
});
