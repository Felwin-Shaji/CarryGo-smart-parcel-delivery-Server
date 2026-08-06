import { inject, injectable } from "tsyringe";
import { IHubTempRepository } from "../../Interfaces/Repositories/Hub/IHubTempRepository";
import { ICheckTempHubStatusUseCase } from "../../Interfaces/UseCases/Hub/ICheckTempHubStatusUseCase";

@injectable()
export class CheckTempHubStatusUseCase implements ICheckTempHubStatusUseCase {
    constructor(
        @inject("IHubTempRepository") private _hubTempRepo: IHubTempRepository,
    ) {}

    async execute(email: string) {

        const tempHub = await this._hubTempRepo.findOne({ email });

        console.log(tempHub)

        if (!tempHub) {
            return { exists: false };
        }

        return {
            exists: true,
            status: tempHub.status,
            tempHubId: tempHub.id!,
            expiresAt: tempHub.expiresAt!
        };
    }
}
