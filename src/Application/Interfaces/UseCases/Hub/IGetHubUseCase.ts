import { HubOverviewResponseDTO } from "../../../DTOs/Hub/HubOverviewDTO";

export interface IGetHubUseCase {
    execute(hubId:string):Promise<HubOverviewResponseDTO>;
}