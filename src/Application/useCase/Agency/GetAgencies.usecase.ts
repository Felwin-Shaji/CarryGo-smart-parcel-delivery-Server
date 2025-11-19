import { inject, injectable } from "tsyringe";
import { IGetAgenciesUseCase } from "../../interfaces/useCase_Interfaces/Agency/GetAgenciesUseCase";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { Agency } from "../../../Domain/Entities/Agency/Agency";

@injectable()
export class GetAgenciesUseCase implements IGetAgenciesUseCase {

  constructor(
    @inject("IAgencyRepository")
    private agencyRepo: IAgencyRepository
  ) {}

  async execute(input: {
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  }): Promise<{
    data: Agency[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page, limit, search, sortBy, sortOrder } = input;

    return await this.agencyRepo.getPaginatedAgencies(
      page,
      limit,
      search,
      sortBy,
      sortOrder
    );
  }
}
