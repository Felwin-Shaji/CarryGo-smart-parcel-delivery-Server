import { ServiceableHubWithAgencyDTO } from "../../../../Dto/User/Booking.dto";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface IFindServicableAgencyUsecase {
  execute(
    pickupLocation: GeoLocation,
    deliveryLocation: GeoLocation
  ): Promise<ServiceableHubWithAgencyDTO[]>;
}