import { AdminResetPasswordRequestDTO } from "../../../DTOs/Admin/adminProfile.dto";

export interface IResetAdminPasswordUsecase {
    execute(adminId: string, dto: AdminResetPasswordRequestDTO): Promise<void>
}