import { ServiceableTravelerDTO } from "../../../../Dto/User/Booking.dto";
import { GeoLocation } from "./IFindServicableAgencyUsecase";

export interface IFindServiceableTravelerUsecase {
  execute(
    pickupLocation: GeoLocation,
    deliveryLocation: GeoLocation
  ): Promise<ServiceableTravelerDTO[]>;
}