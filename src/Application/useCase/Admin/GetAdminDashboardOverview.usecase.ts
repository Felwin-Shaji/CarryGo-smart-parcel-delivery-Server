import { inject, injectable } from "tsyringe";
import { IGetAdminDashboardOverviewUseCase } from "../../interfaces/useCase_Interfaces/Admin/IGetAdminDashboardOverviewUseCase";
import { AdminDashboardResponseDTO, GetAdminDashboardDTO } from "../../Dto/Admin/adminDashboard.dto";
import { IAdminDashboardRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminDashboardRepository";

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