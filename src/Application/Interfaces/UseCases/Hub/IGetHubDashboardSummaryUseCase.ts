import { GetHubDashboardSummaryResponseDTO } from "../../../DTOs/Hub/HubDashboardDTO";

export interface IGetHubDashboardSummaryUseCase {
    execute(hubId: string): Promise<GetHubDashboardSummaryResponseDTO>
};