import { GetHubDashboardShipmentsPreviewResponseDTO } from "@/Application/Dto/Hub/hubDashboar.dto";

export interface IGetHubDashboardShipmentsPreviewUseCase {
    execute(hubId: string): Promise<GetHubDashboardShipmentsPreviewResponseDTO>;
}