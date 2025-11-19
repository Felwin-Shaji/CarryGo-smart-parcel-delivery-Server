import { inject, injectable } from "tsyringe";
import { IGetAgencyWithKYCUseCase } from "../../interfaces/useCase_Interfaces/Agency/GetAgencyWithKYCUseCase";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { AppError } from "../../../Domain/utils/customError";

@injectable()
export class GetAgencyWithKYCUseCase implements IGetAgencyWithKYCUseCase  {
  constructor(
    @inject("IAgencyRepository")
    private agencyRepo: IAgencyRepository
) {}

  async execute(id: string) {
    const data = await this.agencyRepo.findAgencyWithKYC(id);

    if (!data) throw new AppError("Agency not found", 404);

    return data;
  }
}
