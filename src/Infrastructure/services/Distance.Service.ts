import { IDistanceService, GeoPoint } from "../../Application/interfaces/services_Interfaces/IDistanceService";

export class DistanceService implements IDistanceService {

    calculateDistanceInKilometers(from: GeoPoint, to: GeoPoint): number {
        const earthRadiusKm = 6371;

        const latDiff = this.degToRad(to.lat - from.lat);
        const lngDiff = this.degToRad(to.lng - from.lng);

        const a =
            Math.sin(latDiff / 2) ** 2 +
            Math.cos(this.degToRad(from.lat)) *
            Math.cos(this.degToRad(to.lat)) *
            Math.sin(lngDiff / 2) ** 2;

        return (
            earthRadiusKm *
            2 *
            Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        );
    }

    private degToRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
}
