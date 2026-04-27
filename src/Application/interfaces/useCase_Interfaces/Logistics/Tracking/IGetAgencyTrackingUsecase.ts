import { AgencyParcelTrackingDTO } from "@/Application/Dto/Logistics/ParcelTracking.dto";
import { Role } from "@/Infrastructure/Types/types";

export interface IGetAgencyTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<AgencyParcelTrackingDTO>;
}

