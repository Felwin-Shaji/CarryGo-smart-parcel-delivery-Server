import { User } from "../../../Domain/Entities/User";
import { UserProfileResponseDTO } from "../../DTOs/User/UserDTO";

export class UserProfileMapper {
    static toGetUserProfileResponseDTO(user: User): UserProfileResponseDTO {
        return {
            role: user.role,
            id: user.id!,
            name: user.name,
            email: user.email,
            mobile: user.mobile!,
            isBlocked: user.isBlocked,
            kycStatus: user.kycStatus,
            createdAt: user.createdAt
        }
    }
} 