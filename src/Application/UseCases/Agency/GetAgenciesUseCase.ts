import { inject, injectable } from "tsyringe";
import { IGetAgenciesUseCase } from "../../Interfaces/UseCases/Agency/IGetAgenciesUseCase";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/IAgencyRepository";
import {  GetAgenciesDTO, GetAgenciesResponseDTO } from "../../DTOs/Agency/AgencyDTO";
import { AgencyMapper } from "../../Mappers/Agency/AgencyMapper";




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
