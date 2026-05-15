import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { IEditHubProfileUseCase } from "../../interfaces/useCase_Interfaces/Hub/IEditHubProfileUseCase";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { EditHubProfileRequestDto, HubProfileResponseDTO } from "../../Dto/Hub/hubProfile.dto";
import { HubProfileMapper } from "../../Mappers/Hub/HubProfileMapper";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";

@injectable()
export class EditHubProfileUseCase implements IEditHubProfileUseCase {
    constructor(
        @inject("IHubRepository") private readonly _hubRepo: IHubRepository
    ) { };

    async execute(userId: string, dto: EditHubProfileRequestDto): Promise<HubProfileResponseDTO> {

        const hubData = await this._hubRepo.findOneAndUpdate({ _id: userId }, dto);
        if (!hubData) throw new AppError(HUB_MESSAGES.PROFILE_UPDATE_FAILURE);

        return HubProfileMapper.toGetHubProfileResponseDTO(hubData);
    }
}