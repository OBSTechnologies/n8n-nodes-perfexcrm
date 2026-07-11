/**
 * Transforms the n8n `lineItems` fixedCollection value into the `newitems`
 * array that the PerfexCRM api_webhooks API expects when creating/updating
 * invoices, estimates and credit notes.
 *
 * The node UI collects line items as a fixedCollection spread into the request
 * body:
 *   { lineItems: { item: [ { description: 'Consulting', qty: 3, rate: 500 }, ... ] } }
 *
 * The API expects them under `newitems`:
 *   { newitems: [ { description: 'Consulting', qty: 3, rate: 500 }, ... ] }
 *
 * Without this, node-created invoices/estimates carry no line items and total
 * 0.00. This mutates the body in place, removes the temporary `lineItems`
 * property, and is a safe no-op on any body without one (so it can be called
 * centrally for every request).
 *
 * `taxname` may be supplied as a comma-separated string (e.g. "VAT|24.00") and
 * is normalized to the array form the API expects.
 */
export function applyLineItems(body: unknown): void {
	if (!body || typeof body !== 'object') {
		return;
	}

	const record = body as Record<string, unknown>;
	if (!('lineItems' in record)) {
		return;
	}

	const raw = record.lineItems as { item?: Array<Record<string, unknown>> } | undefined;
	delete record.lineItems;

	const rows = raw && Array.isArray(raw.item) ? raw.item : [];
	const mapped: Array<Record<string, unknown>> = [];

	for (const row of rows) {
		if (!row || typeof row !== 'object') {
			continue;
		}

		const description = row.description === undefined || row.description === null
			? ''
			: String(row.description);
		const rate = row.rate === undefined || row.rate === null || row.rate === '' ? 0 : row.rate;

		// Skip empty rows (no description and no rate).
		if (description.trim() === '' && Number(rate) === 0) {
			continue;
		}

		const item: Record<string, unknown> = {
			description,
			qty: row.qty === undefined || row.qty === null || row.qty === '' ? 1 : row.qty,
			rate,
		};

		if (row.long_description !== undefined && row.long_description !== null && String(row.long_description) !== '') {
			item.long_description = row.long_description;
		}
		if (row.unit !== undefined && row.unit !== null && String(row.unit) !== '') {
			item.unit = row.unit;
		}
		if (row.taxname !== undefined && row.taxname !== null && String(row.taxname).trim() !== '') {
			item.taxname = String(row.taxname)
				.split(',')
				.map((t) => t.trim())
				.filter((t) => t !== '');
		}

		mapped.push(item);
	}

	if (mapped.length > 0) {
		record.newitems = mapped;
	}
}
