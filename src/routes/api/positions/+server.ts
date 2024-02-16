import { createPosition, searchPosition } from '$database/positions';
import { PositionTypes, type AddPositionRequestBody, type Position } from '$models/position';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { HttpStatusCode } from 'axios';
import { ErrorResponse } from '$lib/apiClient/client';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

export const POST: RequestHandler = async ({ request }) => {
    let positionData: AddPositionRequestBody = {} as AddPositionRequestBody;
    await request.json().then((data: AddPositionRequestBody) => {
        positionData = data;
    }).catch((error) => {
        return json(new ErrorResponse(HttpStatusCode.NotFound, error.message, true), { status: HttpStatusCode.BadRequest });
    });

    const error = validatePosition(positionData);
    if (error) {
        return json(new ErrorResponse(HttpStatusCode.NotFound, error.message, true), { status: HttpStatusCode.BadRequest });
    }

    const position: Position = {
        _id: uuidv4(),
        name: positionData.name,
        parentId: positionData.parentId,
        positionType: positionData.positionType,
        latitude: 0,
        longitude: 0,
        createdAt: new Date()
    }

    // create the position
    return createPosition(position).then(() => {
        return json(position, { status: 200, });
    }).catch((error) => {
        return json(new ErrorResponse(HttpStatusCode.InternalServerError, error.message, false), { status: HttpStatusCode.InternalServerError });
    });
};

export const GET: RequestHandler = async ({ request, url }) => {
    let positionType: PositionTypes = PositionTypes.All;
    if (!Object.values(PositionTypes).includes(String(url.searchParams.get('type') ?? '') as PositionTypes)) {
        positionType = PositionTypes.All
    } else {
        positionType = String(url.searchParams.get('type') ?? '') as PositionTypes
    }

    return searchPosition(positionType).then((positions) => {
        return json(positions, { status: 200, });
    }).catch((error) => {
        return json(new ErrorResponse(HttpStatusCode.InternalServerError, error.message, false), { status: HttpStatusCode.InternalServerError });
    })
};


function validatePosition(pos: AddPositionRequestBody): Error | null {
    if (!pos.positionType || (pos.positionType as string) === "") {
        return Error("Position type is required");
    }

    if (!Object.values(PositionTypes).includes(pos.positionType)) {
        return Error("Position type is required");
    }

    if (!pos.name || pos.name === "") {
        return Error("Name is required");
    }

    // parent is required for all position types except cities
    if (pos.positionType !== PositionTypes.City) {
        if (!pos.parentId || pos.parentId === "") {
            return Error("Parent is required");
        }
    }

    return null;
}



