import { PUBLIC_POSTHOG_KEY, PUBLIC_POSTHOG_URL } from '$env/static/public';
import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {
	if (browser) {
		posthog.init(PUBLIC_POSTHOG_KEY, { api_host: PUBLIC_POSTHOG_URL })
	}

	return
}
