import { GetHubDashboardTrendRequestDTO, GetHubDashboardTrendResponseDTO } from "@/Application/Dto/Hub/hubDashboar.dto";

export interface IGetHubDashboardTrendUseCase {
    execute(
        hubId: string,
        dto: GetHubDashboardTrendRequestDTO
    ): Promise<GetHubDashboardTrendResponseDTO>;
}