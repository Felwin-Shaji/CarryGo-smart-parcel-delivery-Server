import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";
import { IGetHubProfileUseCase } from "../../Interfaces/UseCases/Hub/IGetHubProfileUseCase";
import { HubProfileMapper } from "../../Mappers/Hub/HubProfileMapper";
import { HubProfileResponseDTO } from "../../DTOs/Hub/HubProfileDTO";
import { HUB_MESSAGES } from "../../../Infrastructure/Constants/Messages/hubMessage";

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