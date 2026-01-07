import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AgencyProfileResponseDTO } from "../../Dto/Agency/agencyProfile.dto";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IGetAgencyProfileUseCase } from "../../interfaces/useCase_Interfaces/Agency/IGetAgencyProfileUseCase";
import { AgencyProfileMapper } from "../../Mappers/Agency/AgencyProfileMapper";

@injectable()
export class GetAgencyProfileUseCase implements IGetAgencyProfileUseCase {
    constructor(
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
    ) { }
    async execute(agencyId: string): Promise<AgencyProfileResponseDTO> {

        const agency = await this._agencyRepo.findById({ _id: agencyId });

        if (!agency) throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
        
        return AgencyProfileMapper.toGetAgencyProfileResponseDTO(agency);
    }
}