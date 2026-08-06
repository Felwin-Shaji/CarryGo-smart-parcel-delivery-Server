import { GetHubDashboardTrendRequestDTO, GetHubDashboardTrendResponseDTO } from "../../../DTOs/Hub/HubDashboardDTO";

export interface IGetHubDashboardTrendUseCase {
    execute(
        hubId: string,
        dto: GetHubDashboardTrendRequestDTO
    ): Promise<GetHubDashboardTrendResponseDTO>;
}