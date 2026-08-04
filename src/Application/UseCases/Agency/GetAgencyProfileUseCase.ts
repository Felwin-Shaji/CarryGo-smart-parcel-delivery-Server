import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/Constants/Messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { AgencyProfileResponseDTO } from "../../DTOs/Agency/AgencyProfileDTO";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/IAgencyRepository";
import { IGetAgencyProfileUseCase } from "../../Interfaces/UseCases/Agency/IGetAgencyProfileUseCase";
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