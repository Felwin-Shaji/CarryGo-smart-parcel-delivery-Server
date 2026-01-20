import { inject, injectable } from "tsyringe";
import { IUpdateHubKycStatusUseCase } from "../../interfaces/useCase_Interfaces/Hub/IUpdateHubKycStatusUseCase";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { updateHubKycStatusDTO } from "../../Dto/Hub/hub.dto";

@injectable()
export class UpdateHubKycStatusUseCase implements IUpdateHubKycStatusUseCase{
    constructor(
        @inject("IHubRepository") private _hubRepo: IHubRepository,
    ){};

    async execute(hubId: string, dto: updateHubKycStatusDTO): Promise<void> {
        await this._hubRepo.updateKycSatus(hubId,dto);
    }
}