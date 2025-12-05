import { inject, injectable } from "tsyringe";
import { IGetAgencyWithKYCUseCase } from "../../interfaces/useCase_Interfaces/Agency/GetAgencyWithKYCUseCase";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import logger from "../../../Infrastructure/logger/logger";
import { AgencyMapper } from "../../Mappers/Agency/AgencyMapper";
import { AgencyWithKYCResponseDTO } from "../../Dto/Agency/agency.dto";


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
