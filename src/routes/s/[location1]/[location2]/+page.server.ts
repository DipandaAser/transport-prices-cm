import { getPositionByFullName } from '$database/positions';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    let location1 = await getPositionByFullName(params.location1).then((res) => {
        return res;
    }).catch((err) => {
        return undefined;
    });

    let location2 = await getPositionByFullName(params.location2).then((res) => {
        return res;
    }).catch((err) => {
        return undefined;
    });



    return {
        location1: {
            searchWord: params.location1,
            found: location1 !== undefined,
            data: location1,
        },
        location2: {
            searchWord: params.location2,
            found: location2 !== undefined,
            data: location2,
        },
    };
}) satisfies PageServerLoad;