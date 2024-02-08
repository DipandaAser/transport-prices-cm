import type { Price } from "$models/prices";
import db from "./db";
export const PRICE_COLLECTION_NAME = "prices";


export function createPrice(data: Price) {
    return db.collection<Price>(PRICE_COLLECTION_NAME).insertOne(data);
}