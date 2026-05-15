import { GetHubDashboardTrendRequestDTO, GetHubDashboardTrendResponseDTO } from "../../../Dto/Hub/hubDashboar.dto";

export interface IGetHubDashboardTrendUseCase {
    execute(
        hubId: string,
        dto: GetHubDashboardTrendRequestDTO
    ): Promise<GetHubDashboardTrendResponseDTO>;
}