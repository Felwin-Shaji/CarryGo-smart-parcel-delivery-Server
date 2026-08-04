import { AdminResetPasswordRequestDTO } from "../../../DTOs/Admin/AdminProfileDTO";

export interface IResetAdminPasswordUsecase {
    execute(adminId: string, dto: AdminResetPasswordRequestDTO): Promise<void>
}