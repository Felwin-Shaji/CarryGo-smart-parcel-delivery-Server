import { inject, injectable } from "tsyringe";
import { IAgencyKYCRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/AgencyKYC";
import { AgencyKYC_DTO } from "../../Dto/Agency/agency.dto";
import { ISaveAgencyKycUseCase } from "../../interfaces/useCase_Interfaces/Agency/SaveAgencyKycUseCase";
import { AgencyKYC } from "../../../Domain/Entities/Agency/AgencyKYC";

@injectable()
export class SaveAgencyKycUseCase implements ISaveAgencyKycUseCase {
  constructor(
    @inject("IAgencyKYCRepository") private kycRepo: IAgencyKYCRepository
  ) {}

  async execute(dto: AgencyKYC_DTO, uploadedFiles: any):Promise<AgencyKYC> {
    return await this.kycRepo.saveKYC(dto.agencyId, {
      tradeLicenseNumber: dto.tradeLicenseNumber,
      PANnumber: dto.PANnumber,
      gst_number: dto.gst_number,
      status: "PENDING",
      ...uploadedFiles,
    });
  }
}
