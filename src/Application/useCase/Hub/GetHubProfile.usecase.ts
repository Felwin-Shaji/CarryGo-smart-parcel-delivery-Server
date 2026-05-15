import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { IGetHubProfileUseCase } from "../../interfaces/useCase_Interfaces/Hub/IGetHubProfileUseCase";
import { HubProfileMapper } from "../../Mappers/Hub/HubProfileMapper";
import { HubProfileResponseDTO } from "../../Dto/Hub/hubProfile.dto";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";

@injectable()
export class GetHubProfileUseCase implements IGetHubProfileUseCase {
    constructor(
        @inject("IHubRepository") private _hubRepo: IHubRepository,
    ) { }
    async execute(hubId: string): Promise<HubProfileResponseDTO> {

        const hub = await this._hubRepo.findById({ _id: hubId });

        if (!hub) throw new AppError(HUB_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        return HubProfileMapper.toGetHubProfileResponseDTO(hub);
    }
}