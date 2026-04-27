import { AgencyParcelTrackingDTO, TravelerParcelTrackingDTO } from "@/Application/Dto/Logistics/ParcelTracking.dto";
import { Role } from "@/Infrastructure/Types/types";

export interface IGetTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<TravelerParcelTrackingDTO | AgencyParcelTrackingDTO>;
}