import { GetHubDashboardSummaryResponseDTO } from "@/Application/Dto/Hub/hubDashboar.dto";

export interface IGetHubDashboardSummaryUseCase {
    execute(hubId: string): Promise<GetHubDashboardSummaryResponseDTO>
};