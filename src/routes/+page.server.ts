import type { PageServerLoad } from './$types';
import db from "$lib/server/database/db";

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;