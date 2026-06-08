import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { IGetWorkerProfileUseCase } from "../../interfaces/useCase_Interfaces/Worker/IGetWorkerProfileUseCase";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { WorkerProfileResponseDTO } from "../../Dto/Workers/workerProfile.dto";
import { WorkerProfileMapper } from "../../Mappers/Workers/WorkerProfileMapper";

@injectable()
export class GetWorkerProfileUseCase implements IGetWorkerProfileUseCase {
    constructor(
        @inject("IHubWorkerRepository") private _hubWorkerRepo: IHubWorkerRepository,
    ) { }
    async execute(workerId: string): Promise<WorkerProfileResponseDTO> {

        const worker = await this._hubWorkerRepo.findById({ _id: workerId });

        if (!worker) throw new AppError(WORKER_MESSAGES.WORKERS_NOT_FOUND, STATUS.NOT_FOUND);

        return WorkerProfileMapper.toGetWorkerProfileResponseDTO(worker);
    }  
}