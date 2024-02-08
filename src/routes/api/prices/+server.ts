import { TransportType, type Price, type PriceMotoMetadata, type PriceTaxiMetadata } from '$models/prices';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPositionById } from '$database/positions';
import { ErrorResponse } from '$lib/apiClient/client';
import { HttpStatusCode } from 'axios';
import { createPrice } from '$database/prices';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

export const POST: RequestHandler = async ({ request, isSubRequest }) => {
    // if (!isSubRequest) {
    //     return json(returnMessageObject("you want to trick me 🤣😂😁"), { status: 400, statusText: "Do not cheat" });
    // }

    let price: Price = {} as Price;
    await request.json().then((data: Price) => {
        price = data;
    }).catch((error) => {
        return json(new ErrorResponse(HttpStatusCode.NotFound, error.message, true), { status: HttpStatusCode.BadRequest });
    });

    const error = validatePrice(price);
    if (error) {
        return json(new ErrorResponse(HttpStatusCode.NotFound, error.message, true), { status: HttpStatusCode.BadRequest });
    }

    const startPos = await getPositionById(price.startPositionId);
    if (!startPos) {
        return json(new ErrorResponse(HttpStatusCode.NotFound, "Start position not found", true), { status: HttpStatusCode.NotFound });
    }

    const endPos = await getPositionById(price.endPositionId);
    if (!endPos) {
        return json(new ErrorResponse(HttpStatusCode.NotFound, "End position not found", true), { status: HttpStatusCode.NotFound });
    }

    if (price.price % 25 !== 0) {
        return json(new ErrorResponse(HttpStatusCode.BadRequest, "Price must be a multiple of 25", true), { status: HttpStatusCode.BadRequest });
    }

    price._id = uuidv4();
    price.createdAt = new Date();

    // create the price
    return createPrice(price).then(() => {
        return json(price, { status: 200, });
    }).catch((error) => {
        return json(new ErrorResponse(HttpStatusCode.InternalServerError, error.message, false), { status: HttpStatusCode.InternalServerError });
    });
};

function validatePrice(price: Price): Error | null {
    if (!price.startPositionId || price.startPositionId === "") {
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

    const err = validatePriceMetadata(price);
    if (err) {
        return err;
    }

    return null;
}

function validatePriceMetadata(price: Price): Error | null {
    if (price.transportType === TransportType.Moto) {
        const metadata = price.transportMetadata as PriceMotoMetadata;
        if (!metadata) {
            return Error("Invalid metadata for type Moto");
        }

        if (metadata.vip === undefined || metadata.day === undefined) {
            return Error("Invalid metadata for type Moto");
        }
    }

    if (price.transportType === TransportType.Taxi) {
        const metadata = price.transportMetadata as PriceTaxiMetadata;
        if (!metadata) {
            return Error("Invalid metadata for type Taxi");
        }

        if (metadata.vip === undefined || metadata.day === undefined) {
            return Error("Invalid metadata for type Taxi");
        }
    }

    return null;
}

function returnMessageObject(message: string) {
    return { "message": message };
}