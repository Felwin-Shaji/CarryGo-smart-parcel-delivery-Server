import { GetHubsDTO, GetHubsResponseDTO } from "../../../Dto/Hub/hub.dto";

export interface IGetHubsUsecase {
    execute(agencyId: string, dto?: GetHubsDTO): Promise<GetHubsResponseDTO>;
}