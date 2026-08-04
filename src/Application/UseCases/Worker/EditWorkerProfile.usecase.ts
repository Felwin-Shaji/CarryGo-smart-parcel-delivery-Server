import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/worker.repository";
import { IEditWorkerProfileUseCase } from "../../Interfaces/UseCases/Worker/IEditWorkerProfileUseCase";
import { EditWorkerProfileRequestDto, WorkerProfileResponseDTO } from "../../DTOs/Worker/WorkerProfileDTO";
import { WorkerProfileMapper } from "../../Mappers/Worker/WorkerProfileMapper";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessage";

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