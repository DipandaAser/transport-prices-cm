/**
 * Description placeholder
 * @date 2/7/2024 - 11:37:24 PM
 *
 * @export
 * @interface Position
 * @typedef {Position}
 */
export interface Position {
    /**
     * Description placeholder
     * @date 2/7/2024 - 11:37:24 PM
     *
     * @type {string}
     */
    _id: string;
    /**
     * Description placeholder
     * @date 2/7/2024 - 11:37:24 PM
     *
     * @type {string}
     */
    name: string;
    /**
     * Parent id of the position. 
     * If the position is a city, the parentId is empty, 
     * if the position is a ward, the parentId is the id of the city, 
     * if the position is a place, the parentId is the id of the ward
     * @date 2/7/2024 - 11:37:24 PM
     *
     * @type {string}
     */
    parentId: string;
    /**
     * Position type it can be place, ward, city
     * @date 2/7/2024 - 11:37:24 PM
     *
     * @type {string}
     */
    positionType: PositionTypes;
    /**
     * Latitude of the position
     * @date 2/7/2024 - 11:37:23 PM
     *
     * @type {number}
     */
    latitude: number;
    /**
     * Longitude of the position
     * @date 2/7/2024 - 11:37:22 PM
     *
     * @type {number}
     */
    longitude: number;
    /**
     * The date the position was created
     * @date 2/16/2024 - 11:37:22 PM
     *
     * @type {Date}
     */
    createdAt: Date;
}

export interface AddPositionRequestBody {
    name: string;
    parentId: string;
    positionType: PositionTypes;
}

export enum PositionTypes {
    Place = 'place',
    Ward = 'ward',
    City = 'city',
    All = ''
}

export const PositionsTypesI18N = {
    en: {
        [PositionTypes.Place]: 'Place',
        [PositionTypes.Ward]: 'Ward',
        [PositionTypes.City]: 'Village or City',
        [PositionTypes.All]: 'All',
    },
    fr: {
        [PositionTypes.Place]: 'Lieu',
        [PositionTypes.Ward]: 'Quartier',
        [PositionTypes.City]: 'Village ou Ville',
        [PositionTypes.All]: 'Tout',
    }
};