import type { Price } from "$models/prices";
import axios from 'axios';
import { ErrorResponse } from "./client";

/**
 * Call the price a JSON `Response` object from the supplied data.
 * @param {Price} price The price to be created. The field `_id` will be overwritten by the server.
 */
export function createPriceAPI(price: Price) {
    return new Promise<Price>((resolve, reject) => {
        axios.post('/api/prices', price).then(response => {
            const resData: Price = response.data as Price;
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