import { inject, injectable } from "tsyringe";
import { GetHubDashboardTypesResponseDTO } from "../../Dto/Hub/hubDashboar.dto";
import { IHubShipmentRepository } from "../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IGetHubDashboardTypesUseCase } from "../../interfaces/useCase_Interfaces/Hub/IGetHubDashboardTypesUseCase";

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