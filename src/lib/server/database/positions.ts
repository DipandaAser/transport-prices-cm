import { getDB } from "./db";
import { PositionTypes, type Position } from "$lib/models/position";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';



export const positionCollectionName = "positions";

export async function createPosition(data: Position) {
    return getDB().collection<Position>(positionCollectionName).insertOne(data);
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
            parentId: position.parentId,
            positionType: position.positionType,
            latitude: position.latitude,
            longitude: position.longitude,
            createdAt: position.createdAt
        } as Position
    })

    return positions
}

export async function getPositionById(id: string): Promise<Position | null> {
    const query = { _id: id as any };
    const data = await getDB().collection<Position>(positionCollectionName).findOne(query, {})
    if (!data) {
        return null
    }

    return {
        _id: data._id as unknown as string,
        name: data.name,
        parentId: data.parentId,
        positionType: data.positionType,
        latitude: data.latitude,
        longitude: data.longitude
    } as Position
}

export async function searchPosition(type: PositionTypes): Promise<Position[]> {
    const pipeline: any[] = [];

    // positionType filter
    if (type !== PositionTypes.All) {
        pipeline.push({
            '$match': {
                'positionType': type
            }
        })
    }

    // sort by name
    pipeline.push({
        '$sort': {
            'positionType': -1
        }
    })

    //lookup first parent. 
    //The parent of a PositionTypes.Place is a PositionTypes.Ward
    //The parent of a PositionTypes.Ward is a PositionTypes.City
    // So these stages wil work for Place and Ward
    // But it will not crash if we use it for City, it will just return and empty parent
    pipeline.push(
        {
            '$lookup': {
                'from': positionCollectionName,
                'localField': 'parentId',
                'foreignField': '_id',
                'as': 'parent'
            }
        },
        {
            '$set': {
                'parent': {
                    '$first': '$parent'
                }
            }
        },
        // set the parent name by prefixing it with a comma
        {
            '$set': {
                'parent.name': {
                    '$ifNull': [
                        {
                            '$concat': [
                                ', ', '$parent.name'
                            ]
                        }, ''
                    ]
                }
            }
        })

    // lookup second parent
    // These stages will only work for Place, because the parent of a Place is a Ward and a Ward have a city parent
    // It will not crash if we use it for Ward or City, it will just return an empty parent
    pipeline.push(
        {
            '$lookup': {
                'from': positionCollectionName,
                'localField': 'parent.parentId',
                'foreignField': '_id',
                'as': 'parent.parent'
            }
        },
        {
            '$set': {
                'parent.parent': {
                    '$first': '$parent.parent'
                }
            }
        },
        // set the parent name by prefixing it with a comma
        {
            '$set': {
                'parent.parent.name': {
                    '$ifNull': [
                        {
                            '$concat': [
                                ', ', '$parent.parent.name'
                            ]
                        },
                        '',
                    ]
                }
            }
        })

    // Concatenate the name of the position with the name of its parents
    pipeline.push({
        '$set': {
            'name': {
                '$concat': [
                    '$name', '$parent.name', '$parent.parent.name'
                ]
            }
        }
    })



    const data = await getDB().collection<Position>(positionCollectionName).aggregate(pipeline).toArray()
    if (!data) {
        return []
    }

    const positions = data.map((position) => {
        return {
            _id: position._id as unknown as string,
            name: position.name,
            parentId: position.parentId,
            positionType: position.positionType,
            latitude: position.latitude,
            longitude: position.longitude,
            createdAt: position.createdAt
        } as Position
    })

    return positions
}