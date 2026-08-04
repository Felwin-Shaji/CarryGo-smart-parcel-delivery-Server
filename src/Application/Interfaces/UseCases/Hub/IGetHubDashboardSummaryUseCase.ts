import { GetHubDashboardSummaryResponseDTO } from "../../../DTOs/Hub/hubDashboar.dto";

export interface IGetHubDashboardSummaryUseCase {
    execute(hubId: string): Promise<GetHubDashboardSummaryResponseDTO>
};