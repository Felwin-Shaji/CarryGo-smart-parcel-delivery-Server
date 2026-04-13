import { ParcelTrackingDTO } from "@/Application/Dto/Logistics/ParcelTracking.dto";
import { Role } from "@/Infrastructure/Types/types";

export interface IGetTrackingUsecase {
    execute(bookingId: string, role: Role, userId: string): Promise<ParcelTrackingDTO>;
}

// const result = await usecase.execute(req.params.id, req.user.role, req.user.id);
