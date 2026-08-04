import { DeliveriesChartRequestDTO, DeliveriesChartResponseDTO } from "../../../DTOs/Agency/AgencyDashboardDTO";

export interface IAgencyGetDeliveriesChartUseCase {
    execute(agencyId: string, query: DeliveriesChartRequestDTO): Promise<DeliveriesChartResponseDTO>;
}