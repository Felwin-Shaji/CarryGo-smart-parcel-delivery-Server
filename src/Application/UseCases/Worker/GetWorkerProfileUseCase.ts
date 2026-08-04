import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { IGetWorkerProfileUseCase } from "../../Interfaces/UseCases/Worker/IGetWorkerProfileUseCase";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/worker.repository";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { WorkerProfileResponseDTO } from "../../DTOs/Worker/workerProfile.dto";
import { WorkerProfileMapper } from "../../Mappers/Worker/WorkerProfileMapper";

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