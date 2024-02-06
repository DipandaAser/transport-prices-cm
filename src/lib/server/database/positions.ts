import db from "./db";
import type { Position } from "$lib/models/position";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

export const positionCollectionName = "positions";

export async function createPosition(data: Position) {
    // @ts-ignore
    return db.collection(positionCollectionName).insertOne(data);
}

export async function getAllPositions(): Promise<Position[]> {
    const data = await db.collection(positionCollectionName).find({}).toArray()
    if (!data) {
        return []
    }

    const positions = data.map((position) => {
        return {
            _id: position._id as unknown as string,
            name: position.name,
            cityId: position.cityId,
            stateID: position.stateID,
            isCity: position.isCity,
            isState: position.isState,
            latitude: position.latitude,
            longitude: position.longitude
        }
    })

    return positions
}