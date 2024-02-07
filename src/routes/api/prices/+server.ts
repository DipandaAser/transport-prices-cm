import { TransportType, type Price } from '$models/prices';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    return request.json().then((data: Price) => {
        const error = validatePrice(data);
        if (error) {
            return json(returnMessageObject(error.message), { status: 400 });
        }

        return json(data, { status: 200 });
    }).catch((error) => {
        return json({ "message": error.message }, { status: 400 });
    });
};

function validatePrice(price: Price): Error | null {
    if (!price.startPostionId || price.startPostionId === "") {
        return Error("Start position is required");
    }

    if (!price.endPositionId || price.endPositionId === "") {
        return Error("End position is required");
    }

    if (!price.price || price.price <= 0) {
        return Error("Price must be greater than 0");
    }

    if (!price.transportType || (price.transportType as string) === "") {
        return Error("Transport type is required");
    }

    // check if the transport type is valid
    if (!Object.values(TransportType).includes(price.transportType)) {
        return Error("Invalid transport type");
    }

    return null;
}

function returnMessageObject(message: string) {
    return { "message": message };
}