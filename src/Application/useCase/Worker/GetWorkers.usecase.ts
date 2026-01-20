import { inject, injectable } from "tsyringe";
import { GetWorkersDTO, GetHubWorkersResponseDTO } from "../../Dto/Workers/worker.dto";
import { IGetWorkersUseCase } from "../../interfaces/useCase_Interfaces/Worker/IGetWorkersUseCase";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { AppError } from "../../../Domain/utils/customError";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

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