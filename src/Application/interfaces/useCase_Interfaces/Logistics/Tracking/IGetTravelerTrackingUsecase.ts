import { TravelerParcelTrackingDTO } from "@/Application/Dto/Logistics/ParcelTracking.dto";
import { Role } from "@/Infrastructure/Types/types";

export interface IGetTravelerTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<TravelerParcelTrackingDTO>;
}