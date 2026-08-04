import { autoInjectable, inject } from "tsyringe";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";
import { IGetHubUseCase } from "../../Interfaces/UseCases/Hub/IGetHubUseCase";
import { HubOverviewResponseDTO } from "../../DTOs/Hub/HubOverviewDTO";
import { AppError } from "../../../Domain/Utils/customError";
import { HUB_MESSAGES } from "../../../Infrastructure/Constants/Messages/hubMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { HubMapper } from "../../Mappers/Hub/HubMapper";

@autoInjectable()
export class GetHubUseCase implements IGetHubUseCase {
    constructor(
        @inject("IHubRepository") private _hubRepo: IHubRepository,
    ) { }

    async execute(hubId: string): Promise<HubOverviewResponseDTO> {
        const hub = await this._hubRepo.getHubById(hubId);

        if(!hub) throw new AppError(HUB_MESSAGES.NOT_FOUND,STATUS.NOT_FOUND);

        return HubMapper.toHubOverviewResponseDTO(hub);
    }
}