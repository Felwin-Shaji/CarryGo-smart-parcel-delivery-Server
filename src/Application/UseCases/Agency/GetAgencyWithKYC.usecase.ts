import { inject, injectable } from "tsyringe";
import { IGetAgencyWithKYCUseCase } from "../../Interfaces/UseCases/Agency/GetAgencyWithKYCUseCase";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/agency.repository";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { AGENCY_MESSAGES } from "../../../Infrastructure/Constants/Messages/agencyMessages";
import logger from "../../../Infrastructure/Logger/logger";
import { AgencyMapper } from "../../Mappers/Agency/AgencyMapper";
import { AgencyWithKYCResponseDTO } from "../../DTOs/Agency/AgencyDTO";


@injectable()
export class GetAgencyWithKYCUseCase implements IGetAgencyWithKYCUseCase {
  constructor(
    @inject("IAgencyRepository")
    private _agencyRepo: IAgencyRepository
  ) { }

  async execute(agencyId: string):Promise<AgencyWithKYCResponseDTO> {

    const data = await this._agencyRepo.findAgencyWithKYC(agencyId);

    if (!data) throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

    logger.info(`${data} =>GetAgencyWithKYCUseCase  agency with kyc`)

    return AgencyMapper.toResponseWithKycDTO(data);;
  }
}
