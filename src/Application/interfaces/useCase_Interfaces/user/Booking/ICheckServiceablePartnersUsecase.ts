import { ServiceableAgencyAndTravelerDTO } from "../../../../Dto/User/Booking.dto";

export interface GeoLocation {
  lat: number;
  lng: number;
}


export interface ICheckServiceablePartnersUsecase {
    execute(
        pickupLocation: GeoLocation,
        deliveryLocation: GeoLocation
    ): Promise<ServiceableAgencyAndTravelerDTO>;
}