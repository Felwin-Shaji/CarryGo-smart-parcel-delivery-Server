import { CheckServiceableAgencyDTO, ServiceableHubWithAgencyDTO } from "../../../../DTOs/User/BookingDTO";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface IFindServicableAgencyUsecase {
  execute(
    dto: CheckServiceableAgencyDTO
  ): Promise<ServiceableHubWithAgencyDTO[]>;
}