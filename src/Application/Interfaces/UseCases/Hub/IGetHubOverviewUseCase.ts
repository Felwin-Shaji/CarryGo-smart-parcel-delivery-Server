import { GetHubOverviewResponseDTO } from "../../../DTOs/Hub/HubOverviewDTO";

export interface IGetHubOverviewUseCase{
    execute(hubId:string):Promise<GetHubOverviewResponseDTO>
}