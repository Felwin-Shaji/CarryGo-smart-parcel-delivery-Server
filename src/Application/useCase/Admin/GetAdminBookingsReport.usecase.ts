import { inject, injectable } from "tsyringe";
import { AdminBookingsReportDTO, AdminBookingsReportResponseDTO } from "../../Dto/Admin/adminDashboard.dto";
import { IAdminDashboardRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminDashboardRepository";
import { IGetAdminBookingsReportUseCase } from "../../interfaces/useCase_Interfaces/Admin/IGetAdminBookingsReportUseCase";

@injectable()
export class GetAdminBookingsReportUseCase implements IGetAdminBookingsReportUseCase {

    constructor(
        @inject("IAdminDashboardRepository") private _adminDashboardRepository: IAdminDashboardRepository
    ) { }

    async execute(dto: AdminBookingsReportDTO): Promise<AdminBookingsReportResponseDTO> {

        return await this._adminDashboardRepository.getBookingsReport(dto);
    }
}