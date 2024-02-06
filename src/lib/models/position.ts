export interface Position {
    _id: string;
    name: string;
    cityId: string;
    stateID: string;
    isCity: boolean;
    isState: boolean;
    latitude: number;
    longitude: number;
}