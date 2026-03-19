import { CheckServiceableAgencyDTO, ServiceableHubWithAgencyDTO } from "../../../../Dto/User/Booking.dto";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface IFindServicableAgencyUsecase {
  execute(
    dto: CheckServiceableAgencyDTO
  ): Promise<ServiceableHubWithAgencyDTO[]>;
}