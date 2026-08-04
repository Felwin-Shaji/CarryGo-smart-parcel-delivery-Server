import { GetHubOverviewResponseDTO } from "../../../DTOs/Hub/hubOverview.dto";

export interface IGetHubOverviewUseCase{
    execute(hubId:string):Promise<GetHubOverviewResponseDTO>
}