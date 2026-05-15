import { Role } from "../../../../../Infrastructure/Types/types";
import { TravelerParcelTrackingDTO } from "../../../../Dto/Logistics/ParcelTracking.dto";


export interface IGetTravelerTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<TravelerParcelTrackingDTO>;
}