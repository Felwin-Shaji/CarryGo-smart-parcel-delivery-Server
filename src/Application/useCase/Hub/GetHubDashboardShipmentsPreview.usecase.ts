import { GetHubDashboardShipmentsPreviewResponseDTO } from "@/Application/Dto/Hub/hubDashboar.dto";
import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IGetHubDashboardShipmentsPreviewUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardShipmentsPreviewUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetHubDashboardShipmentsPreviewUseCase implements IGetHubDashboardShipmentsPreviewUseCase {
    constructor(
        @inject("IHubShipmentRepository") private _shipmentRepo: IHubShipmentRepository
    ) { }

    async execute(hubId: string): Promise<GetHubDashboardShipmentsPreviewResponseDTO> {
        const [recentShipments, unassignedShipments] = await Promise.all([
            this._shipmentRepo.findRecentShipmentsByHub(hubId, 5),
            this._shipmentRepo.findUnassignedShipmentsByHub(hubId, 5),
        ]);

        return {
            recentShipments,
            unassignedShipments,
        };
    }
}
