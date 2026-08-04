import { inject, injectable } from "tsyringe";
import { AdminBookingsReportDTO, AdminBookingsReportResponseDTO } from "../../DTOs/Admin/AdminDashboardDTO";
import { IAdminDashboardRepository } from "../../Interfaces/Repositories/Admin/IAdminDashboardRepository";
import { IGetAdminBookingsReportUseCase } from "../../Interfaces/UseCases/Admin/IGetAdminBookingsReportUseCase";

@injectable()
export class GetAdminBookingsReportUseCase implements IGetAdminBookingsReportUseCase {

    constructor(
        @inject("IAdminDashboardRepository") private _adminDashboardRepository: IAdminDashboardRepository
    ) { }

    async execute(dto: AdminBookingsReportDTO): Promise<AdminBookingsReportResponseDTO> {

        return await this._adminDashboardRepository.getBookingsReport(dto);
    }
}