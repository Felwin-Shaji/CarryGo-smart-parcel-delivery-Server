import { HubWorker } from "../../../Domain/Entities/Worker/Worker";
import { WorkerProfileResponseDTO } from "../../Dto/Workers/workerProfile.dto";

export class WorkerProfileMapper {
    static toGetWorkerProfileResponseDTO(
        worker: HubWorker
    ): WorkerProfileResponseDTO {
        return {
            id: worker.id!,
            name: worker.name,
            email: worker.email,
            mobile: worker.mobile!,
            role: worker.role,
            createdAt: worker.createdAt,
            kycStatus: worker.kycStatus,
            isBlocked: worker.isBlocked
        };
    }
}
