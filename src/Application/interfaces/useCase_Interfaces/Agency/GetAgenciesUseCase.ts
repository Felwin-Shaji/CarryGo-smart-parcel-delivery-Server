import { GetAgenciesDTO, GetAgenciesResponseDTO } from "../../../Dto/Agency/agency.dto";


export interface IGetAgenciesUseCase {
    execute(dto: GetAgenciesDTO): Promise<GetAgenciesResponseDTO>;
}
