import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { IEditHubProfileUseCase } from "../../Interfaces/UseCases/Hub/IEditHubProfileUseCase";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/hub.repository";
import { EditHubProfileRequestDto, HubProfileResponseDTO } from "../../DTOs/Hub/HubProfileDTO";
import { HubProfileMapper } from "../../Mappers/Hub/HubProfileMapper";
import { HUB_MESSAGES } from "../../../Infrastructure/Constants/Messages/hubMessage";

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