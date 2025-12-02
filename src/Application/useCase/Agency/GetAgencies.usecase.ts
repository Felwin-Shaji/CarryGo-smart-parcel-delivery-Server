import { inject, injectable } from "tsyringe";
import { IGetAgenciesUseCase } from "../../interfaces/useCase_Interfaces/Agency/GetAgenciesUseCase";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { Agency } from "../../../Domain/Entities/Agency/Agency";
import { AgencyResponseDTO, GetAgenciesDTO, GetAgenciesResponseDTO } from "../../Dto/Agency/agency.dto";

export class AgencyMapper {
  static toResponseDTO(agency: Agency): AgencyResponseDTO {
    return {
      id: agency.id!,
      name: agency.name,
      email: agency.email,
      mobile: agency.mobile!,
      isBlocked: agency.isBlocked,
      kycStatus: agency.kycStatus,
      createdAt: agency.createdAt,
    };
  }
}


@injectable()
export class GetAgenciesUseCase implements IGetAgenciesUseCase {

  constructor(
    @inject("IAgencyRepository")
    private _agencyRepo: IAgencyRepository
  ) { }

  async execute(dto: GetAgenciesDTO): Promise<GetAgenciesResponseDTO> {

    const agencies = await this._agencyRepo.getPaginatedAgencies(dto)

    const responseAgency: GetAgenciesResponseDTO = {
      data: agencies.data.map(agency => AgencyMapper.toResponseDTO(agency)),
      total: agencies.total,
      page: dto.page,
      limit: dto.limit,
      totalPages: agencies.totalPages
    }

    return responseAgency
  }
}
