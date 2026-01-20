import { HubOverviewResponseDTO } from "../../../Dto/Hub/hubOverview.dto";

export interface IGetHubUseCase {
    execute(hubId:string):Promise<HubOverviewResponseDTO>;
}