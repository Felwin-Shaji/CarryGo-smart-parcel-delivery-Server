import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { IEditHubProfileUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IEditHubProfileUseCase";
import { IHubRepository } from "@/Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { EditHubProfileRequestDto, HubProfileResponseDTO } from "@/Application/Dto/Hub/hubProfile.dto";
import { HUB_MESSAGES } from "@/Infrastructure/constants/messages/hubMessage";
import { HubProfileMapper } from "@/Application/Mappers/Hub/HubProfileMapper";

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