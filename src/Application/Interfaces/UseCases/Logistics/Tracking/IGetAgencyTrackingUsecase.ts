import { Role } from "../../../../../Infrastructure/Types/CommonTypes";
import { AgencyParcelTrackingDTO } from "../../../../DTOs/Logistics/ParcelTrackingDTO";

export interface IGetAgencyTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<AgencyParcelTrackingDTO>;
}

