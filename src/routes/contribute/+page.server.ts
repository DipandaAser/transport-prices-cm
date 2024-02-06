import { getAllPositions } from '$database/positions';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        positions: await getAllPositions()
    };
}) satisfies PageServerLoad;