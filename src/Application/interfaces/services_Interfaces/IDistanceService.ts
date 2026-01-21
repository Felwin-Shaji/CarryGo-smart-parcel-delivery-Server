export interface GeoPoint {
    lat: number;
    lng: number;
};

export interface IDistanceService {
    calculateDistanceInKilometers(from: GeoPoint, to: GeoPoint): number;
};

