import { injectable, inject } from "tsyringe";
import { IHubWorkersTempRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository";
import { CheckTempWorkerStatusResponseDTO, ICheckTempWorkerStatusUseCase } from "../../interfaces/useCase_Interfaces/Worker/ICheckTempWorkerStatusUseCase";

@injectable()
export class CheckTempWorkerStatusUseCase implements ICheckTempWorkerStatusUseCase {
    constructor(
        @inject("IHubWorkersTempRepository") private _hubWorkersTempRepo: IHubWorkersTempRepository,
    ) { }

    async execute(email: string): Promise<CheckTempWorkerStatusResponseDTO> {
        const tempWorker = await this._hubWorkersTempRepo.findOne({ email });

        if (!tempWorker) {
            return { exists: false };
        }

        return {
            exists:true,
            status:tempWorker.status,
            tempWorkerId:tempWorker._id!
        }
    }
}