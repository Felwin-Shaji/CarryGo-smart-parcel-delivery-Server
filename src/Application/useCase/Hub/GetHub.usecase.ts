import { autoInjectable, inject } from "tsyringe";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { IGetHubUseCase } from "../../interfaces/useCase_Interfaces/Hub/IGetHubUseCase";
import { HubOverviewResponseDTO } from "../../Dto/Hub/hubOverview.dto";
import { AppError } from "../../../Domain/utils/customError";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
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