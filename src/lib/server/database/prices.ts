import type { Price, PricesByTransportType } from "$models/prices";
import { getDB } from "./db";
export const PRICE_COLLECTION_NAME = "prices";


export function createPrice(data: Price) {
    return getDB().collection<Price>(PRICE_COLLECTION_NAME).insertOne(data);
}

export async function isPricesExistForTheseLocations(location1: string, location2: string): Promise<boolean> {
    const countGreaterThanZero = await getDB().collection<Price>(PRICE_COLLECTION_NAME).countDocuments({
        $and: [
            { startPositionId: location1 },
            { endPositionId: location2 }
        ]
    }).then((res) => {
        return res > 0;
    }).catch((err) => {
        return false;
    });

    return countGreaterThanZero;
}


export async function getPricesForTheseLocations(location1: string, location2: string) {
    return new Promise<PricesByTransportType[]>(async (resolve, reject) => {
        const pipeline: any[] = [];

        // Match the start and end positions
        pipeline.push({
            '$match': {
                'startPositionId': location1,
                'endPositionId': location2
            }
        });

        // group by transport type and price
        pipeline.push({
            '$group': {
                '_id': {
                    'transportType': '$transportType',
                    'price': '$price'
                },
                'total': {
                    '$sum': 1
                },
                'refs': {
                    '$push': '$$ROOT'
                }
            }
        })

        // sort refs by createdAt most recent
        pipeline.push({
            '$unwind': {
                'path': '$refs'
            }
        }, {
            '$sort': {
                'refs.createdAt': -1
            }
        }, {
            '$group': {
                '_id': '$_id',
                'total': {
                    '$first': '$total'
                },
                'refs': {
                    '$push': '$refs'
                }
            }
        })

        // group by transport type
        pipeline.push({
            '$group': {
                '_id': '$_id.transportType',
                'total': {
                    '$sum': '$total'
                },
                'prices': {
                    '$push': {
                        'price': '$_id.price',
                        'total': '$total',
                        'refs': '$refs'
                    }
                }
            }
        })

        // sort prices by total occurrences
        pipeline.push({
            '$unwind': {
                'path': '$prices'
            }
        }, {
            '$sort': {
                'prices.total': -1
            }
        }, {
            '$group': {
                '_id': '$_id',
                'total': {
                    '$first': '$total'
                },
                'prices': {
                    '$push': '$prices'
                }
            }
        })

        // sort transport types by total occurrences
        pipeline.push({
            '$sort': {
                'total': -1
            }
        })

        const data = await getDB().collection(PRICE_COLLECTION_NAME).aggregate(pipeline).toArray()
        if (!data) {
            reject(new Error("No data found"))
            return
        }


        const prices = data.map((data) => {
            return {
                _id: data._id,
                total: data.total,
                prices: data.prices
            } as PricesByTransportType
        })

        resolve(prices)
    })
}