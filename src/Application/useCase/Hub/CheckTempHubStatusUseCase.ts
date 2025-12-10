import { inject, injectable } from "tsyringe";
import { IHubTempRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hubTemp.repository";
import { ICheckTempHubStatusUseCase } from "../../interfaces/useCase_Interfaces/Hub/ICheckTempHubStatusUseCase";

@injectable()
export class CheckTempHubStatusUseCase implements ICheckTempHubStatusUseCase {
    constructor(
        @inject("IHubTempRepository") private _hubTempRepo: IHubTempRepository,
    ) {}

    async execute(email: string) {

        const tempHub = await this._hubTempRepo.findOne({ email });

        if (!tempHub) {
            return { exists: false };
        }

        return {
            exists: true,
            status: tempHub.status,
            tempHubId: tempHub._id,
            expiresAt: tempHub.expiresAt
        };
    }
}
