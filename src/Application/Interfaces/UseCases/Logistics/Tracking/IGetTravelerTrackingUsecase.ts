import { Role } from "../../../../../Infrastructure/Types/types";
import { TravelerParcelTrackingDTO } from "../../../../DTOs/Logistics/ParcelTrackingDTO";


export interface IGetTravelerTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<TravelerParcelTrackingDTO>;
}