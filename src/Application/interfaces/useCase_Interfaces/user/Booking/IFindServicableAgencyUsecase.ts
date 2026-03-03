import { ServiceableHubWithAgencyDTO } from "../../../../Dto/User/Booking.dto";
import { GeoLocation } from "./ICheckServiceablePartnersUsecase";

export interface IFindServicableAgencyUsecase {
  execute(
    pickupLocation: GeoLocation,
    deliveryLocation: GeoLocation
  ): Promise<ServiceableHubWithAgencyDTO[]>;
}