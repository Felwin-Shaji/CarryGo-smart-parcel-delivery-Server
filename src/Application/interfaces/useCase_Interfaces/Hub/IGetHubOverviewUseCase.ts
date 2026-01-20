import { GetHubOverviewResponseDTO } from "../../../Dto/Hub/hubOverview.dto";

export interface IGetHubOverviewUseCase{
    execute(hubId:string):Promise<GetHubOverviewResponseDTO>
}