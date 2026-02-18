import { ServiceableTravelerDTO } from "../../../../Dto/User/Booking.dto";

export interface IFindServiceableTravelerUsecase {
  execute(fromPincode: string, toPincode: string): Promise<ServiceableTravelerDTO[]>;
}
