import { GetHubDashboardTrendRequestDTO, GetHubDashboardTrendResponseDTO } from "../../DTOs/Hub/HubDashboardDTO";
import { IHubShipmentRepository } from "../../Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { IGetHubDashboardTrendUseCase } from "../../Interfaces/UseCases/Hub/IGetHubDashboardTrendUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetHubDashboardTrendUseCase implements IGetHubDashboardTrendUseCase {
    constructor(
        @inject("IHubShipmentRepository") private shipmentRepo: IHubShipmentRepository
    ) { }

    async execute(hubId: string, dto: GetHubDashboardTrendRequestDTO): Promise<GetHubDashboardTrendResponseDTO> {
        const { from, to } = dto;

        const trend = await this.shipmentRepo.getShipmentTrend(
            hubId,
            from,
            to
        );

        return { trend };
    }
}