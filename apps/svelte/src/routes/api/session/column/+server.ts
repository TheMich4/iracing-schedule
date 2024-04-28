import { COLUMN_KEY } from '$lib/config/column';

export async function PUT({ locals, request }) {
	// Get the session data and response function
	const { data, response } = locals.session;

	try {
		const { id, checked } = await request.json();
		const current = data.get(COLUMN_KEY);

		console.log({ id, checked, current })

		data.set(COLUMN_KEY, {
			...current,
			visibility: {
				...current.visibility,
				[id]: checked
			}
		});
	} catch (e) {
		console.error(e);
	}

	// Respond with new column visibility
	return response(data.get(COLUMN_KEY));
}
