import { inject, injectable } from "tsyringe";
import { IGetAdminDashboardOverviewUseCase } from "../../Interfaces/UseCases/Admin/IGetAdminDashboardOverviewUseCase";
import { AdminDashboardResponseDTO, GetAdminDashboardDTO } from "../../DTOs/Admin/adminDashboard.dto";
import { IAdminDashboardRepository } from "../../Interfaces/Repositories/Admin/IAdminDashboardRepository";

@injectable()
export class GetAdminDashboardOverviewUseCase implements IGetAdminDashboardOverviewUseCase {
    constructor(
        @inject("IAdminDashboardRepository") private _adminDashboardRepository: IAdminDashboardRepository
    ) { }

    async execute(dto: GetAdminDashboardDTO): Promise<AdminDashboardResponseDTO> {
        const res = await this._adminDashboardRepository.getDashboardOverview(dto);
        return res
    }
}