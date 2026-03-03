import { ServiceableTravelerDTO } from "../../../../Dto/User/Booking.dto";
import { GeoLocation } from "./ICheckServiceablePartnersUsecase";

export interface IFindServiceableTravelerUsecase {
  execute(
    pickupLocation: GeoLocation,
    deliveryLocation: GeoLocation
  ): Promise<ServiceableTravelerDTO[]>;
}