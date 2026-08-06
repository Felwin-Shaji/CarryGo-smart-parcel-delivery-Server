import { GetHubsDTO, GetHubsResponseDTO } from "../../../DTOs/Hub/HubDTO";

export interface IGetHubsUsecase {
    execute(agencyId: string, dto?: GetHubsDTO): Promise<GetHubsResponseDTO>;
}