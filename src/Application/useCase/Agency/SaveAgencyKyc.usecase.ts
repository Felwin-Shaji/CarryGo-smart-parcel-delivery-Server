import { inject, injectable } from "tsyringe";
import type { IAgencyKYCRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/AgencyKYC";
import type { ISaveAgencyKycUseCase } from "../../interfaces/useCase_Interfaces/Agency/SaveAgencyKycUseCase";

import { AgencyKYC_DTO } from "../../Dto/Agency/agency.dto";
import { AgencyKYCMapper } from "../../Mappers/Agency/AgencyKYCMapper";
import { AgencyKYC } from "../../../Domain/Entities/Agency/AgencyKYC";

@injectable()
export class SaveAgencyKycUseCase implements ISaveAgencyKycUseCase {
  constructor(
    @inject("IAgencyKYCRepository") private readonly _kycRepo: IAgencyKYCRepository
  ) {}

  async execute(dto: AgencyKYC_DTO, uploadedFiles: any): Promise<AgencyKYC> {
    
    const kycEntity = AgencyKYCMapper.toEntity(dto, uploadedFiles);

    const respose = await this._kycRepo.saveKYC(dto.id, kycEntity);

    return respose 
  }
}
