/**
 * Transforms the n8n `customFields` fixedCollection value into the flat
 * `custom_fields` map that the PerfexCRM api_webhooks API expects on
 * create/update requests (module v2.8.9+).
 *
 * The node UI collects custom fields as a fixedCollection that is spread into
 * the request body via additionalFields/updateFields:
 *   { customFields: { field: [ { key: '21', value: 'BUD-001' }, ... ] } }
 *
 * The API expects a flat map keyed by the custom field's numeric ID or slug:
 *   { custom_fields: { '21': 'BUD-001', ... } }
 *
 * This mutates the body in place: it removes the temporary `customFields`
 * property and, when at least one valid pair exists, sets `custom_fields`.
 * It is a safe no-op on any body without a `customFields` property (so it can
 * be called centrally for every request, including GET/DELETE).
 */
export function applyCustomFields(body: unknown): void {
	if (!body || typeof body !== 'object') {
		return;
	}

	const record = body as Record<string, unknown>;
	if (!('customFields' in record)) {
		return;
	}

	const raw = record.customFields as { field?: Array<{ key?: unknown; value?: unknown }> } | undefined;
	delete record.customFields;

	const pairs = raw && Array.isArray(raw.field) ? raw.field : [];
	const mapped: Record<string, unknown> = {};

	for (const pair of pairs) {
		if (pair && typeof pair === 'object') {
			const key = pair.key === undefined || pair.key === null ? '' : String(pair.key).trim();
			if (key !== '') {
				mapped[key] = pair.value;
			}
		}
	}

	if (Object.keys(mapped).length > 0) {
		record.custom_fields = mapped;
	}
}
