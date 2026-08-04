import { inject, injectable } from "tsyringe";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/worker.repository";
import { IHubWorkerKycRepository } from "../../Interfaces/Repositories/Worker/wrokerKyc.repository";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { IGetWorkerOverviewUseCase } from "../../Interfaces/UseCases/Worker/IGetWorkerOverviewUseCase";
import { GetWorkerOverviewResponseDTO } from "../../DTOs/Worker/worker.dto";
import { WorkerMapper } from "../../Mappers/Worker/WorkerMapper";

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