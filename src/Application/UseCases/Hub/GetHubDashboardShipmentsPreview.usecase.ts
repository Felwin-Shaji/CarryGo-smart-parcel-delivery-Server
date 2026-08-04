import { GetHubDashboardShipmentsPreviewResponseDTO } from "../../DTOs/Hub/HubDashboardDTO";
import { IHubShipmentRepository } from "../../Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { IGetHubDashboardShipmentsPreviewUseCase } from "../../Interfaces/UseCases/Hub/IGetHubDashboardShipmentsPreviewUseCase";
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
