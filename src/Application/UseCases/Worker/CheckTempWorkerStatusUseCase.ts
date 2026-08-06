import { injectable, inject } from "tsyringe";
import { IHubWorkersTempRepository } from "../../Interfaces/Repositories/Worker/IHubWorkersTempRepository";
import { CheckTempWorkerStatusResponseDTO, ICheckTempWorkerStatusUseCase } from "../../Interfaces/UseCases/Worker/ICheckTempWorkerStatusUseCase";

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