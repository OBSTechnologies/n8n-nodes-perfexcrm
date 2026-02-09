import { INode, NodeOperationError } from 'n8n-workflow';

/**
 * Validation helpers for PerfexCRM n8n node.
 * All validators throw NodeOperationError with user-friendly messages.
 */

/**
 * Validates that a date string is in YYYY-MM-DD format or a valid ISO 8601 date.
 * n8n dateTime fields pass ISO 8601 strings (e.g. "2024-01-15T00:00:00.000Z").
 * PerfexCRM API expects YYYY-MM-DD format.
 * Returns the normalized YYYY-MM-DD date string.
 */
export function validateAndFormatDate(
	node: INode,
	value: string,
	fieldName: string,
	itemIndex: number,
): string {
	if (!value || typeof value !== 'string' || value.trim() === '') {
		throw new NodeOperationError(
			node,
			`The field "${fieldName}" requires a valid date. Please provide a date in YYYY-MM-DD format (e.g., "2024-01-15").`,
			{ itemIndex },
		);
	}

	const trimmed = value.trim();

	// Try to parse as ISO 8601 or YYYY-MM-DD
	const date = new Date(trimmed);
	if (isNaN(date.getTime())) {
		throw new NodeOperationError(
			node,
			`The field "${fieldName}" contains an invalid date: "${trimmed}". Please provide a valid date in YYYY-MM-DD format (e.g., "2024-01-15").`,
			{ itemIndex },
		);
	}

	// If already in YYYY-MM-DD format, validate the components
	const dateOnlyMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (dateOnlyMatch) {
		const [, year, month, day] = dateOnlyMatch;
		const y = parseInt(year, 10);
		const m = parseInt(month, 10);
		const d = parseInt(day, 10);

		if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) {
			throw new NodeOperationError(
				node,
				`The field "${fieldName}" contains an invalid date: "${trimmed}". Month must be 01-12 and day must be valid for the given month.`,
				{ itemIndex },
			);
		}

		return trimmed;
	}

	// For ISO 8601 strings, extract the YYYY-MM-DD part
	const isoYear = date.getFullYear();
	const isoMonth = String(date.getMonth() + 1).padStart(2, '0');
	const isoDay = String(date.getDate()).padStart(2, '0');

	return `${isoYear}-${isoMonth}-${isoDay}`;
}

/**
 * Validates an email address using a practical regex pattern.
 * Only validates if a non-empty value is provided (optional fields can be empty).
 */
export function validateEmail(
	node: INode,
	value: string,
	fieldName: string,
	itemIndex: number,
): void {
	if (!value || typeof value !== 'string' || value.trim() === '') {
		return; // Email fields are typically optional
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(value.trim())) {
		throw new NodeOperationError(
			node,
			`The field "${fieldName}" contains an invalid email address: "${value}". Please provide a valid email (e.g., "user@example.com").`,
			{ itemIndex },
		);
	}
}

/**
 * Validates that a numeric value is non-negative (>= 0).
 * Useful for monetary amounts, hours, costs, etc.
 * Only validates if a value is provided and is a number.
 */
export function validateNonNegativeNumber(
	node: INode,
	value: unknown,
	fieldName: string,
	itemIndex: number,
): void {
	if (value === undefined || value === null || value === '') {
		return; // Skip validation for empty optional fields
	}

	const num = typeof value === 'number' ? value : Number(value);

	if (isNaN(num)) {
		throw new NodeOperationError(
			node,
			`The field "${fieldName}" must be a valid number. Received: "${value}".`,
			{ itemIndex },
		);
	}

	if (num < 0) {
		throw new NodeOperationError(
			node,
			`The field "${fieldName}" must be a non-negative number. Received: ${num}.`,
			{ itemIndex },
		);
	}
}

/**
 * Validates that a value is a positive integer (for resource IDs).
 * Only validates if a non-empty value is provided.
 */
export function validateNumericId(
	node: INode,
	value: string,
	fieldName: string,
	itemIndex: number,
): void {
	if (!value || typeof value !== 'string' || value.trim() === '') {
		return; // Skip validation for empty optional fields
	}

	const num = Number(value.trim());

	if (isNaN(num) || !Number.isInteger(num) || num < 1) {
		throw new NodeOperationError(
			node,
			`The field "${fieldName}" must be a valid positive integer ID. Received: "${value}".`,
			{ itemIndex },
		);
	}
}

/**
 * Validates date fields in a data object (additionalFields or updateFields).
 * Normalizes dates to YYYY-MM-DD format in-place.
 */
export function validateAndFormatDateFields(
	node: INode,
	data: Record<string, unknown>,
	dateFieldNames: string[],
	itemIndex: number,
): void {
	for (const fieldName of dateFieldNames) {
		if (data[fieldName] && typeof data[fieldName] === 'string') {
			data[fieldName] = validateAndFormatDate(node, data[fieldName] as string, fieldName, itemIndex);
		}
	}
}

/**
 * Validates email fields in a data object.
 */
export function validateEmailFields(
	node: INode,
	data: Record<string, unknown>,
	emailFieldNames: string[],
	itemIndex: number,
): void {
	for (const fieldName of emailFieldNames) {
		if (data[fieldName] && typeof data[fieldName] === 'string') {
			validateEmail(node, data[fieldName] as string, fieldName, itemIndex);
		}
	}
}

/**
 * Validates non-negative number fields in a data object.
 */
export function validateNonNegativeFields(
	node: INode,
	data: Record<string, unknown>,
	fieldNames: string[],
	itemIndex: number,
): void {
	for (const fieldName of fieldNames) {
		if (data[fieldName] !== undefined && data[fieldName] !== null && data[fieldName] !== '') {
			validateNonNegativeNumber(node, data[fieldName], fieldName, itemIndex);
		}
	}
}
