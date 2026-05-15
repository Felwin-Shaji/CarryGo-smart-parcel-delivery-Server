import { Role } from "../../../../../Infrastructure/Types/types";
import { AgencyParcelTrackingDTO, TravelerParcelTrackingDTO } from "../../../../Dto/Logistics/ParcelTracking.dto";


export interface IGetTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<TravelerParcelTrackingDTO | AgencyParcelTrackingDTO>;
}