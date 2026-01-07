import { Admin } from "../../../Domain/Entities/admin";
import { AdminProfileResponseDTO } from "../../Dto/Admin/adminProfile.dto";


export class AdminProfileMapper {
    static toGetAdminProfileResponseDTO(
        admin: Admin
    ): AdminProfileResponseDTO {
        return {
            id: admin.id!,
            name: admin.name,
            email: admin.email,
            mobile: admin.mobile!,
            role: admin.role,
            createdAt: admin.createdAt,
            kycStatus: admin.kycStatus,
            isBlocked: admin.isBlocked
        };
    }
}
