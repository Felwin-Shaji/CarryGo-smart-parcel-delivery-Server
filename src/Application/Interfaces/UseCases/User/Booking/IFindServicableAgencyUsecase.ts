import { CheckServiceableAgencyDTO, ServiceableHubWithAgencyDTO } from "../../../../DTOs/User/Booking.dto";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface IFindServicableAgencyUsecase {
  execute(
    dto: CheckServiceableAgencyDTO
  ): Promise<ServiceableHubWithAgencyDTO[]>;
}