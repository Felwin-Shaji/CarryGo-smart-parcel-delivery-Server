import { GetHubDashboardShipmentsPreviewResponseDTO } from "../../../DTOs/Hub/hubDashboar.dto";

export interface IGetHubDashboardShipmentsPreviewUseCase {
    execute(hubId: string): Promise<GetHubDashboardShipmentsPreviewResponseDTO>;
}