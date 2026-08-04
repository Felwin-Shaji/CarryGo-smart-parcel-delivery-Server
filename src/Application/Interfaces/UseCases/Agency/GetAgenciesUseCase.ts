import { GetAgenciesDTO, GetAgenciesResponseDTO } from "../../../DTOs/Agency/agency.dto";


export interface IGetAgenciesUseCase {
    execute(dto: GetAgenciesDTO): Promise<GetAgenciesResponseDTO>;
}
