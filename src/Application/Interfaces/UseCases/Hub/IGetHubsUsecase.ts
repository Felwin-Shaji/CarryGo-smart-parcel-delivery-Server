import { GetHubsDTO, GetHubsResponseDTO } from "../../../DTOs/Hub/hub.dto";

export interface IGetHubsUsecase {
    execute(agencyId: string, dto?: GetHubsDTO): Promise<GetHubsResponseDTO>;
}