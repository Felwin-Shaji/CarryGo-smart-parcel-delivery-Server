import { HubOverviewResponseDTO } from "../../../DTOs/Hub/hubOverview.dto";

export interface IGetHubUseCase {
    execute(hubId:string):Promise<HubOverviewResponseDTO>;
}