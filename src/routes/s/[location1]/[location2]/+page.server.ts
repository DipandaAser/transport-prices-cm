import { getPositionByFullName, getPositionById } from '$database/positions';
import { getPricesForTheseLocations, isPricesExistForTheseLocations } from '$database/prices';
import type { PricesByTransportType } from '$models/prices';
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

    let locationsFound = location1 !== undefined && location2 !== undefined;
    let isPricesExist = false;
    if (locationsFound) {
        isPricesExist = await isPricesExistForTheseLocations(location1?._id || '', location2?._id || '');
    }

    let prices: PricesByTransportType[] = [];
    if (isPricesExist) {
        prices = await getPricesForTheseLocations(location1?._id || '', location2?._id || '');
    }


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
        prices: {
            exist: isPricesExist,
            data: prices,
        }
    };
}) satisfies PageServerLoad;