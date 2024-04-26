const KEY = 'favorite';

export async function PUT({ locals, request }) {
	// Get the session data and response function
	const { data, response } = locals.session;

	try {
		const { type, id } = await request.json();
		const current = data.get(KEY);
		console.log({ type, id, data, current });

		data.set(KEY, {
			[type]: {
				...current[type],
				[id]: !current[type]?.[id]
			}
		});
	} catch (e) {
		console.error(e);
	}

	// Respond with new favorite series
	return response(data.get(KEY));
}
