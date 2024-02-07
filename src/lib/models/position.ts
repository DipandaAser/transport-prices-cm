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
     * Description placeholder
     * @date 2/7/2024 - 11:37:24 PM
     *
     * @type {string}
     */
    cityId: string;
    /**
     * Description placeholder
     * @date 2/7/2024 - 11:37:23 PM
     *
     * @type {string}
     */
    stateID: string;
    /**
     * Description placeholder
     * @date 2/7/2024 - 11:37:23 PM
     *
     * @type {boolean}
     */
    isCity: boolean;
    /**
     * Description placeholder
     * @date 2/7/2024 - 11:37:23 PM
     *
     * @type {boolean}
     */
    isState: boolean;
    /**
     * Description placeholder
     * @date 2/7/2024 - 11:37:23 PM
     *
     * @type {number}
     */
    latitude: number;
    /**
     * Description placeholder
     * @date 2/7/2024 - 11:37:22 PM
     *
     * @type {number}
     */
    longitude: number;
}