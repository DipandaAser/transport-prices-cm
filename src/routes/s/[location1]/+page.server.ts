import { getPositionByFullName } from '$database/positions';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const position = await getPositionByFullName(params.location1).then((position) => {
        return position;
    }).catch((error) => {
        return null;
    });

    if (!position) {
        return {
            status: 404,
            error: new Error(`Position not found: ${params.location1}`)
        };
    }

    return {};
}) satisfies PageServerLoad;