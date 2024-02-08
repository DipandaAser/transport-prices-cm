import { getDB } from "./db";
import type { Position } from "$lib/models/position";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';



export const positionCollectionName = "positions";

export async function createPosition(data: Position) {
    // @ts-ignore
    return getDB().collection(positionCollectionName).insertOne(data);
}

export async function getAllPositions(): Promise<Position[]> {
    const data = await getDB().collection(positionCollectionName).find({}).toArray()
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

export async function getPositionById(id: string): Promise<Position | null> {
    const query = { _id: id as any };
    const data = await getDB().collection(positionCollectionName).findOne(query, {})
    if (!data) {
        return null
    }

    return {
        _id: data._id as unknown as string,
        name: data.name,
        cityId: data.cityId,
        stateID: data.stateID,
        isCity: data.isCity,
        isState: data.isState,
        latitude: data.latitude,
        longitude: data.longitude
    } as Position
}