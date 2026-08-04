import { AdminProfileResponseDTO, EditAdminProfileRequestDto } from "../../../DTOs/Admin/AdminProfileDTO";

export interface IEditAdminProfileUseCase {
    execute(userId: string, dto: EditAdminProfileRequestDto): Promise<AdminProfileResponseDTO>;
}