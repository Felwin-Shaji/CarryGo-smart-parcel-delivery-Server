import { DeliveriesChartRequestDTO, DeliveriesChartResponseDTO } from "../../../Dto/Agency/agencyDashboard.dto";

export interface IAgencyGetDeliveriesChartUseCase {
    execute(agencyId: string, query: DeliveriesChartRequestDTO): Promise<DeliveriesChartResponseDTO>;
}