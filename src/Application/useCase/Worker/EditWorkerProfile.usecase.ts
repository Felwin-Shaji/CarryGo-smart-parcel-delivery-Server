import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IEditWorkerProfileUseCase } from "../../interfaces/useCase_Interfaces/Worker/IEditWorkerProfileUseCase";
import { EditWorkerProfileRequestDto, WorkerProfileResponseDTO } from "../../Dto/Workers/workerProfile.dto";
import { WorkerProfileMapper } from "../../Mappers/Workers/WorkerProfileMapper";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";

@injectable()
export class EditWorkerProfileUseCase implements IEditWorkerProfileUseCase {
    constructor(
        @inject("IHubWorkerRepository") private readonly _workerRepo: IHubWorkerRepository
    ) { };

    async execute(userId: string, dto: EditWorkerProfileRequestDto): Promise<WorkerProfileResponseDTO> {

        const workerData = await this._workerRepo.findOneAndUpdate({ _id: userId }, dto);
        if (!workerData) throw new AppError(WORKER_MESSAGES.PROFILE_UPDATE_FAILURE);

        return WorkerProfileMapper.toGetWorkerProfileResponseDTO(workerData);
    }
}