import { ServiceableHubWithAgencyDTO } from "../../../../Dto/User/Booking.dto";

export interface IValidatePincodeUsecase {
    execute(fromPincode: string, toPincode: string):Promise<ServiceableHubWithAgencyDTO[]>
}