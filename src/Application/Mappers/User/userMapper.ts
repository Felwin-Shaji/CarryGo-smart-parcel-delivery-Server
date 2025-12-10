import { User } from "../../../Domain/Entities/User";
import { GetUserResponseDto, GetUsersDBResult } from "../../Dto/User/user.dto";


export class UserMapper {
    static toResponseDTO(getUsersResult:GetUsersDBResult):GetUserResponseDto {

        const userDto = getUsersResult.data.map((user:User) => ({
            id: user._id!,
            name: user.name,
            email: user.email,
            mobile: user.mobile!,
            isBlocked: user.isBlocked,
            kycStatus: user.kycStatus,
            createdAt: user.createdAt,
        })) ;

        return {
            data: userDto,
            total: getUsersResult.total,
            page: getUsersResult.page,
            limit: getUsersResult.limit,
            totalPages: 1,
        };
    }
}