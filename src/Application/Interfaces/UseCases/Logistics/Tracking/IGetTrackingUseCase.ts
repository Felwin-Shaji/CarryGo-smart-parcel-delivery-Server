import { Role } from "../../../../../Infrastructure/Types/CommonTypes";
import { AgencyParcelTrackingDTO, TravelerParcelTrackingDTO } from "../../../../DTOs/Logistics/ParcelTrackingDTO";


export interface IGetTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<TravelerParcelTrackingDTO | AgencyParcelTrackingDTO>;
}