import { GetHubDashboardTypesResponseDTO } from "../../../DTOs/Hub/hubDashboar.dto";

export interface IGetHubDashboardTypesUseCase {
    execute(hubId: string): Promise<GetHubDashboardTypesResponseDTO>;
}