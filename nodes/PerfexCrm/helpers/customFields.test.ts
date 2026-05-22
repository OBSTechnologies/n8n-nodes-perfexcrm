import { applyCustomFields } from './customFields';

describe('applyCustomFields', () => {
	it('transforms field pairs into a custom_fields map (id and slug keys)', () => {
		const body: Record<string, unknown> = {
			name: 'X',
			customFields: { field: [ { key: '21', value: 'BUD-001' }, { key: 'phase', value: 'Build' } ] },
		};
		applyCustomFields(body);
		expect(body.custom_fields).toEqual({ '21': 'BUD-001', phase: 'Build' });
		expect(body.customFields).toBeUndefined();
		expect(body.name).toBe('X');
	});

	it('removes customFields and sets nothing when empty', () => {
		const body: Record<string, unknown> = { name: 'X', customFields: {} };
		applyCustomFields(body);
		expect(body.customFields).toBeUndefined();
		expect(body.custom_fields).toBeUndefined();
	});

	it('skips pairs with empty or whitespace-only keys', () => {
		const body: Record<string, unknown> = {
			customFields: { field: [ { key: '', value: 'a' }, { key: '  ', value: 'b' }, { key: '7', value: 'c' } ] },
		};
		applyCustomFields(body);
		expect(body.custom_fields).toEqual({ '7': 'c' });
	});

	it('trims keys', () => {
		const body: Record<string, unknown> = { customFields: { field: [ { key: ' 30 ', value: 'v' } ] } };
		applyCustomFields(body);
		expect(body.custom_fields).toEqual({ '30': 'v' });
	});

	it('is a no-op when customFields is absent', () => {
		const body: Record<string, unknown> = { name: 'X' };
		applyCustomFields(body);
		expect(body).toEqual({ name: 'X' });
	});

	it('handles undefined, null and non-object bodies gracefully', () => {
		expect(() => applyCustomFields(undefined)).not.toThrow();
		expect(() => applyCustomFields(null)).not.toThrow();
		expect(() => applyCustomFields('x')).not.toThrow();
	});
});
