import { inject, injectable } from "tsyringe";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IHubWorkerKycRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { IGetWorkerOverviewUseCase } from "../../interfaces/useCase_Interfaces/Worker/IGetWorkerOverviewUseCase";
import { GetWorkerOverviewResponseDTO } from "../../Dto/Workers/worker.dto";
import { WorkerMapper } from "../../Mappers/Workers/WorkerMapper";

@injectable()
export class GetWorkerOverviewUseCase implements IGetWorkerOverviewUseCase {
  constructor(
    @inject("IHubWorkerRepository") private _workerRepository: IHubWorkerRepository,

    @inject("IHubWorkerKycRepository") private _hubWorkerKycRepository: IHubWorkerKycRepository
  ) {}

  async execute(workerId: string): Promise<GetWorkerOverviewResponseDTO> {
    
    const worker = await this._workerRepository.findById({ _id: workerId });

    if (!worker) {
      throw new AppError(WORKER_MESSAGES.WORKERS_NOT_FOUND, STATUS.NOT_FOUND);
    }

    const kyc = await this._hubWorkerKycRepository.getKycBySubjectId(
      workerId,
      "worker"
    );

    const workerOverview = WorkerMapper.toWorkerOverviewResponseDTO(worker, kyc);

    return workerOverview;
  }
}