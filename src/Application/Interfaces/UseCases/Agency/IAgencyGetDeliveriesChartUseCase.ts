import { DeliveriesChartRequestDTO, DeliveriesChartResponseDTO } from "../../../DTOs/Agency/agencyDashboard.dto";

export interface IAgencyGetDeliveriesChartUseCase {
    execute(agencyId: string, query: DeliveriesChartRequestDTO): Promise<DeliveriesChartResponseDTO>;
}