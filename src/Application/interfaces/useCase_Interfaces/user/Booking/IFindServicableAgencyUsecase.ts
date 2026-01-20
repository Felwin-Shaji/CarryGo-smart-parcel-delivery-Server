import { ServiceableHubWithAgencyDTO } from "../../../../Dto/User/Booking.dto";

export interface IFindServicableAgencyUsecase {
    execute(fromPincode: string, toPincode: string): Promise<ServiceableHubWithAgencyDTO[]>;
}