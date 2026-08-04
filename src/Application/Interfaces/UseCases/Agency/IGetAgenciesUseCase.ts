import { GetAgenciesDTO, GetAgenciesResponseDTO } from "../../../DTOs/Agency/AgencyDTO";


export interface IGetAgenciesUseCase {
    execute(dto: GetAgenciesDTO): Promise<GetAgenciesResponseDTO>;
}
