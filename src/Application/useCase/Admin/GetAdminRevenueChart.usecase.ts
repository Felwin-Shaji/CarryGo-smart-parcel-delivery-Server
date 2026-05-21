import { inject, injectable } from "tsyringe";
import { GetAdminDashboardDTO, AdminRevenueChartResponseDTO } from "../../Dto/Admin/adminDashboard.dto";
import { IGetAdminRevenueChartUseCase } from "../../interfaces/useCase_Interfaces/Admin/IGetAdminRevenueChartUseCase";
import { IAdminDashboardRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminDashboardRepository";

@injectable()
export class GetAdminRevenueChartUseCase implements IGetAdminRevenueChartUseCase {

    constructor(

        @inject("IAdminDashboardRepository") private _adminDashboardRepository: IAdminDashboardRepository

    ) { }

    async execute(
        dto: GetAdminDashboardDTO
    ): Promise<AdminRevenueChartResponseDTO> {

        return await this._adminDashboardRepository.getRevenueChart(dto);
    }
}