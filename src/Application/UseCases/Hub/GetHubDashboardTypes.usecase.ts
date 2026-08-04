import { inject, injectable } from "tsyringe";
import { GetHubDashboardTypesResponseDTO } from "../../DTOs/Hub/HubDashboardDTO";
import { IHubShipmentRepository } from "../../Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { IGetHubDashboardTypesUseCase } from "../../Interfaces/UseCases/Hub/IGetHubDashboardTypesUseCase";

@injectable()
export class GetHubDashboardTypesUseCase implements IGetHubDashboardTypesUseCase {
    constructor(
        @inject("IHubShipmentRepository") private shipmentRepo: IHubShipmentRepository
    ) { }

    async execute(
        hubId: string
    ): Promise<GetHubDashboardTypesResponseDTO> {
        return await this.shipmentRepo.getShipmentTypes(hubId);
    }
}