import { GetHubDashboardTypesResponseDTO } from "../../../DTOs/Hub/HubDashboardDTO";

export interface IGetHubDashboardTypesUseCase {
    execute(hubId: string): Promise<GetHubDashboardTypesResponseDTO>;
}