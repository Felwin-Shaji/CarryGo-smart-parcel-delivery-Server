import { inject, injectable } from "tsyringe";
import { GetAdminDashboardDTO, AdminRevenueChartResponseDTO } from "../../DTOs/Admin/AdminDashboardDTO";
import { IGetAdminRevenueChartUseCase } from "../../Interfaces/UseCases/Admin/IGetAdminRevenueChartUseCase";
import { IAdminDashboardRepository } from "../../Interfaces/Repositories/Admin/IAdminDashboardRepository";

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