import type { Price } from "$models/prices";
import axios from 'axios';
import { ErrorResponse } from "./client";
import type { AddPositionRequestBody, Position, PositionTypes } from "$models/position";

/**
 * Search for a position in the database
 * @param {PositionTypes} positionType the type of the position we want to search
 */
export function searchPositionAPI(positionType: PositionTypes) {
    return new Promise<Position[]>((resolve, reject) => {
        axios.get('/api/positions', {
            params: {
                type: positionType
            }
        }).then(response => {
            const resData: Position[] = response.data as Position[];
            resolve(resData);
        }).catch(err => {
            // check if the error has a field called causedByUser, because it means the error is an error catched by the backend team
            if (err.response && err.response.data && err.response.data.causedByUser) {
                const errData: ErrorResponse = err.response.data as ErrorResponse;
                reject(errData);
                return;
            }

            //error not catched by the backend team
            reject(new ErrorResponse(err.response.status, "Internal server error", false));
        });
    });
}

/**
 * Create a new position in the database
 * @param {AddPositionRequestBody} position the position to create
 */
export function createPositionAPI(position: AddPositionRequestBody) {
    return new Promise<Position>((resolve, reject) => {
        axios.post('/api/positions', position).then(response => {
            const resData: Position = response.data as Position;
            resolve(resData);
        }).catch(err => {
            // check if the error has a field called causedByUser, because it means the error is an error catched by the backend team
            if (err.response && err.response.data && err.response.data.causedByUser) {
                const errData: ErrorResponse = err.response.data as ErrorResponse;
                reject(errData);
                return;
            }

            //error not catched by the backend team
            reject(new ErrorResponse(err.response.status, "Internal server error", false));
        });
    });
}