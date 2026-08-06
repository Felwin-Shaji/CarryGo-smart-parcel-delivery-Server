import { inject, injectable } from "tsyringe";
import { GetAdminDashboardDTO, AdminBookingChartResponseDTO } from "../../DTOs/Admin/AdminDashboardDTO";
import { IGetAdminBookingsChartUseCase } from "../../Interfaces/UseCases/Admin/IGetAdminBookingsChartUseCase";
import { IAdminDashboardRepository } from "../../Interfaces/Repositories/Admin/IAdminDashboardRepository";

@injectable()
export class GetAdminBookingsChartUseCase implements IGetAdminBookingsChartUseCase {

    constructor(
        @inject("IAdminDashboardRepository") private _adminDashboardRepository: IAdminDashboardRepository
    ) { }

    async execute(dto: GetAdminDashboardDTO): Promise<AdminBookingChartResponseDTO> {

        return await this._adminDashboardRepository.getBookingsChart(dto);
    }
}