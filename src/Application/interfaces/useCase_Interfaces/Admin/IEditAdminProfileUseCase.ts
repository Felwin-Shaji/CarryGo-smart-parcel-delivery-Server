import { AdminProfileResponseDTO, EditAdminProfileRequestDto } from "../../../Dto/Admin/adminProfile.dto";

export interface IEditAdminProfileUseCase {
    execute(userId: string, dto: EditAdminProfileRequestDto): Promise<AdminProfileResponseDTO>;
}