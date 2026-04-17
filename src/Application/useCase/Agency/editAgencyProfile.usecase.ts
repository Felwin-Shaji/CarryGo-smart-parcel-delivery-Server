import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { AgencyProfileResponseDTO, EditAgencyProfileRequestDto } from "../../Dto/Agency/agencyProfile.dto";
import { AgencyProfileMapper } from "../../Mappers/Agency/AgencyProfileMapper";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { IEditAgencyProfileUseCase } from "../../interfaces/useCase_Interfaces/Agency/IEditAgencyProfileUseCase";

@injectable()
export class EditAgencyProfileUseCase implements IEditAgencyProfileUseCase {
    constructor(
        @inject("IAgencyRepository") private readonly _agencyRepo: IAgencyRepository
    ) { };

    async execute(userId: string, dto: EditAgencyProfileRequestDto): Promise<AgencyProfileResponseDTO> {

        const agencyData = await this._agencyRepo.findOneAndUpdate({ _id: userId }, dto);
        if (!agencyData) throw new AppError(AGENCY_MESSAGES.PROFILE_UPDATE_FAILURE);

        return AgencyProfileMapper.toGetAgencyProfileResponseDTO(agencyData);
    }
}