import { GetHubDashboardShipmentsPreviewResponseDTO } from "../../../DTOs/Hub/HubDashboardDTO";

export interface IGetHubDashboardShipmentsPreviewUseCase {
    execute(hubId: string): Promise<GetHubDashboardShipmentsPreviewResponseDTO>;
}