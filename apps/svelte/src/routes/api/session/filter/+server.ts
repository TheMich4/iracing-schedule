import { FILTER_KEY } from '$lib/config/filter';

export async function PUT({ locals, request }) {
	// Get the session data and response function
	const { data, response } = locals.session;

	try {
		const { id, newFilter } = await request.json();
		const current = data.get(FILTER_KEY);

		data.set(FILTER_KEY, {
			...current,
			[id]: newFilter
		});
	} catch (e) {
		console.error(e);
	}

	// Respond with new filter visibility
	return response(data.get(FILTER_KEY));
}
