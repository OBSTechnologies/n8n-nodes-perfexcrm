import { applyLineItems } from './lineItems';

describe('applyLineItems', () => {
	it('transforms the lineItems collection into a newitems array', () => {
		const body: Record<string, unknown> = {
			clientid: '1',
			lineItems: {
				item: [
					{ description: 'Consulting', qty: 3, rate: 500 },
					{ description: 'Setup', qty: 1, rate: 100, unit: 'job' },
				],
			},
		};
		applyLineItems(body);
		expect(body.newitems).toEqual([
			{ description: 'Consulting', qty: 3, rate: 500 },
			{ description: 'Setup', qty: 1, rate: 100, unit: 'job' },
		]);
		expect(body.lineItems).toBeUndefined();
		expect(body.clientid).toBe('1');
	});

	it('defaults qty to 1 and keeps long_description when provided', () => {
		const body: Record<string, unknown> = {
			lineItems: { item: [ { description: 'Item', rate: 10, long_description: 'More detail' } ] },
		};
		applyLineItems(body);
		expect(body.newitems).toEqual([
			{ description: 'Item', qty: 1, rate: 10, long_description: 'More detail' },
		]);
	});

	it('normalizes a comma-separated taxname string into an array', () => {
		const body: Record<string, unknown> = {
			lineItems: { item: [ { description: 'Taxed', qty: 1, rate: 100, taxname: 'VAT|24.00, GST|5.00' } ] },
		};
		applyLineItems(body);
		expect((body.newitems as any[])[0].taxname).toEqual(['VAT|24.00', 'GST|5.00']);
	});

	it('skips empty rows (no description and no rate)', () => {
		const body: Record<string, unknown> = {
			lineItems: { item: [ { description: '', rate: 0 }, { description: 'Real', qty: 2, rate: 25 } ] },
		};
		applyLineItems(body);
		expect(body.newitems).toEqual([{ description: 'Real', qty: 2, rate: 25 }]);
	});

	it('removes lineItems and sets nothing when empty', () => {
		const body: Record<string, unknown> = { clientid: '1', lineItems: {} };
		applyLineItems(body);
		expect(body.lineItems).toBeUndefined();
		expect(body.newitems).toBeUndefined();
	});

	it('is a no-op when lineItems is absent', () => {
		const body: Record<string, unknown> = { clientid: '1' };
		applyLineItems(body);
		expect(body).toEqual({ clientid: '1' });
	});
});
