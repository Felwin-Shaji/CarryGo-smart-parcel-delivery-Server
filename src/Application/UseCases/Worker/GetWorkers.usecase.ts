import { inject, injectable } from "tsyringe";
import { GetWorkersDTO, GetHubWorkersResponseDTO } from "../../DTOs/Worker/worker.dto";
import { IGetWorkersUseCase } from "../../Interfaces/UseCases/Worker/IGetWorkersUseCase";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/worker.repository";
import { AppError } from "../../../Domain/Utils/customError";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";

@injectable()
export class GetWorkersUseCase implements IGetWorkersUseCase{
    constructor(
        @inject("IHubWorkerRepository") private _hubWorkerRepo: IHubWorkerRepository,
    ){};

    async execute(hubId: string, dto: GetWorkersDTO): Promise<GetHubWorkersResponseDTO> {
        const hubWorkers = await this._hubWorkerRepo.getPaginatedWorkersByHubs(hubId, dto);

        if(!hubWorkers) throw new AppError(WORKER_MESSAGES.WORKERS_NOT_FOUND,STATUS.NOT_FOUND);

        return hubWorkers
    }
}