import { inject, injectable } from "tsyringe";
import { GetAdminDashboardDTO, AdminBookingChartResponseDTO } from "../../Dto/Admin/adminDashboard.dto";
import { IGetAdminBookingsChartUseCase } from "../../interfaces/useCase_Interfaces/Admin/IGetAdminBookingsChartUseCase";
import { IAdminDashboardRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminDashboardRepository";

@injectable()
export class GetAdminBookingsChartUseCase implements IGetAdminBookingsChartUseCase {

    constructor(
        @inject("IAdminDashboardRepository") private _adminDashboardRepository: IAdminDashboardRepository
    ) { }

    async execute(dto: GetAdminDashboardDTO): Promise<AdminBookingChartResponseDTO> {

        return await this._adminDashboardRepository.getBookingsChart(dto);
    }
}