//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

/**
 * @type {Price}
 * 
 * @property {string} _id
 * @property {string} startPostionId
 * @property {string} endPositionId
 * @property {number} price
 * @property {TransportType} transportType
 * @property {Record<string, any> | PriceMotoMetadata | PriceTaxiMetadata} transportMetadata
 * @property {Date} createdAt
 */
//This is the type price
export interface Price {
    _id: string;
    startPostionId: string;
    endPositionId: string;
    price: number;
    transportType: TransportType;
    transportMetadata: Record<string, any> | PriceMotoMetadata | PriceTaxiMetadata;
    createdAt: Date;
}

export interface PriceMotoMetadata {
    vip: boolean;
    day: boolean;
}
/**
 *
 *
 * @export
 * @interface PriceTaxiMetadata
 */
export interface PriceTaxiMetadata {
    vip: boolean;
    day: boolean;
}

/** @enum {string} */
export enum TransportType {
    Moto = "moto",
    Taxi = "taxi",
    Train = "train",
    Bus = "bus",
    Airplane = "airplane"
}

export const TransportTypeLabels = {
    [TransportType.Moto]: "Moto",
    [TransportType.Taxi]: "Taxi",
    [TransportType.Train]: "Train",
    [TransportType.Bus]: "Bus | Car",
    [TransportType.Airplane]: "Airplane"
};

export const TransportTypes = [
    TransportType.Moto,
    TransportType.Taxi,
    TransportType.Train,
    TransportType.Bus,
    TransportType.Airplane
]

export const TransportTypeIconsInDropdown = {
    // [TransportType.Moto]: "🏍️",
    // [TransportType.Taxi]: "🚕",
    // [TransportType.Train]: "🚆",
    // [TransportType.Bus]: "🚌",
    // [TransportType.Airplane]: "✈️" ,
    [TransportType.Moto]: "fxemoji:motorcycle",
    [TransportType.Taxi]: "twemoji:taxi",
    [TransportType.Train]: "noto:train",
    [TransportType.Bus]: "noto:bus",
    [TransportType.Airplane]: "emojione:airplane-departure"
}
export const TransportTypeIconsInSearch = {
    [TransportType.Moto]: "🏍️",
    [TransportType.Taxi]: "🚕",
    [TransportType.Train]: "🚆",
    [TransportType.Bus]: "🚌",
    [TransportType.Airplane]: "✈️"
}

export function generateRandomPrice(): Price {
    let p = {
        _id: uuidv4(),
        startPostionId: "",
        endPositionId: "",
        price: 100,
        transportType: TransportTypes[Math.floor(Math.random() * TransportTypes.length)],
        transportMetadata: {},
        createdAt: new Date()
    }

    p.transportMetadata = generateMetadataForTransportType(p.transportType);

    switch (p.transportType) {
        case TransportType.Moto:
            p.price = 100;
            break;
        case TransportType.Taxi:
            p.price = 250;
            break;
        case TransportType.Train:
            p.price = 5000;
            break;
        case TransportType.Bus:
            p.price = 500;
            break;
        case TransportType.Airplane:
            p.price = 30000;
            break;
    }

    return p;
}

export function generateMetadataForTransportType(transportType: TransportType): Record<string, any> | PriceMotoMetadata | PriceTaxiMetadata {
    switch (transportType) {
        case TransportType.Moto:
            return {
                vip: Math.random() > 0.5 && Math.random() < 0.8,
                day: Math.random() > 0.5 && Math.random() < 0.8
            }
        case TransportType.Taxi:
            return {
                vip: Math.random() > 0.5 && Math.random() < 0.8,
                day: Math.random() > 0.5 && Math.random() < 0.8
            }
        case TransportType.Train:
            return {}
        case TransportType.Bus:
            return {}
        case TransportType.Airplane:
            return {}
    }
}
