import { AdminProfileResponseDTO, EditAdminProfileRequestDto } from "../../../DTOs/Admin/adminProfile.dto";

export interface IEditAdminProfileUseCase {
    execute(userId: string, dto: EditAdminProfileRequestDto): Promise<AdminProfileResponseDTO>;
}