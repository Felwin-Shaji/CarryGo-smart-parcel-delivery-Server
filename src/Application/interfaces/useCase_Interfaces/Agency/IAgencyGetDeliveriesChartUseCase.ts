import { DeliveriesChartRequestDTO, DeliveriesChartResponseDTO } from "@/Application/Dto/Agency/agencyDashboard.dto";

export interface IAgencyGetDeliveriesChartUseCase {
    execute(agencyId: string, query: DeliveriesChartRequestDTO): Promise<DeliveriesChartResponseDTO>;
}