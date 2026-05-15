import { GetHubDashboardTrendRequestDTO, GetHubDashboardTrendResponseDTO } from "../../Dto/Hub/hubDashboar.dto";
import { IHubShipmentRepository } from "../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IGetHubDashboardTrendUseCase } from "../../interfaces/useCase_Interfaces/Hub/IGetHubDashboardTrendUseCase";
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