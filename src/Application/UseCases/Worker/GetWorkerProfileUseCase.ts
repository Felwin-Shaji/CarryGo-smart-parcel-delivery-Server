import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { IGetWorkerProfileUseCase } from "../../Interfaces/UseCases/Worker/IGetWorkerProfileUseCase";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/IHubWorkerRepository";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { WorkerProfileResponseDTO } from "../../DTOs/Worker/WorkerProfileDTO";
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