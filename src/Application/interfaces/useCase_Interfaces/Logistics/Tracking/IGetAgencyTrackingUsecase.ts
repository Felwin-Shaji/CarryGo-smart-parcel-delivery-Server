import { Role } from "../../../../../Infrastructure/Types/types";
import { AgencyParcelTrackingDTO } from "../../../../Dto/Logistics/ParcelTracking.dto";

export interface IGetAgencyTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<AgencyParcelTrackingDTO>;
}

