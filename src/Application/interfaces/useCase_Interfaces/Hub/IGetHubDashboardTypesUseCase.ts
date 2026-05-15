import { GetHubDashboardTypesResponseDTO } from "../../../Dto/Hub/hubDashboar.dto";

export interface IGetHubDashboardTypesUseCase {
    execute(hubId: string): Promise<GetHubDashboardTypesResponseDTO>;
}