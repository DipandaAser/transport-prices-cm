import type { Price } from "$models/prices";
import { getDB } from "./db";
export const PRICE_COLLECTION_NAME = "prices";


export function createPrice(data: Price) {
    return getDB().collection<Price>(PRICE_COLLECTION_NAME).insertOne(data);
}