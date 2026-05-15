import { GetHubDashboardShipmentsPreviewResponseDTO } from "../../../Dto/Hub/hubDashboar.dto";

export interface IGetHubDashboardShipmentsPreviewUseCase {
    execute(hubId: string): Promise<GetHubDashboardShipmentsPreviewResponseDTO>;
}