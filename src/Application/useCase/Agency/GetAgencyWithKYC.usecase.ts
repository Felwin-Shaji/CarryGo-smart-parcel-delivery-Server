import { inject, injectable } from "tsyringe";
import { IGetAgencyWithKYCUseCase } from "../../interfaces/useCase_Interfaces/Agency/GetAgencyWithKYCUseCase";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";

@injectable()
export class GetAgencyWithKYCUseCase implements IGetAgencyWithKYCUseCase  {
  constructor(
    @inject("IAgencyRepository")
    private _agencyRepo: IAgencyRepository
) {}

  async execute(id: string) {
    const data = await this._agencyRepo.findAgencyWithKYC(id);

    if (!data) throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

    return data;
  }
}
