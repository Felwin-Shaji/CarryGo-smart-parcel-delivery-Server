import { User } from "../../../Domain/Entities/User";
import { IWrokerKYCVerification } from "../../../Domain/Entities/Worker/WorkerKyc";
import { GetUserOverviewResponseDTO, GetUserResponseDto, GetUsersDBResult } from "../../Dto/User/user.dto";


export class UserMapper {
    static toResponseDTO(getUsersResult: GetUsersDBResult): GetUserResponseDto {

        const userDto = getUsersResult.data.map((user: User) => ({
            id: user.id!,
            name: user.name,
            email: user.email,
            mobile: user.mobile!,
            isBlocked: user.isBlocked,
            kycStatus: user.kycStatus,
            createdAt: user.createdAt,
        }));

        return {
            data: userDto,
            total: getUsersResult.total,
            page: getUsersResult.page,
            limit: getUsersResult.limit,
            totalPages: 1,
        };
    }

    static toUserOverviewResponseDTO(user: User, kyc: IWrokerKYCVerification): GetUserOverviewResponseDTO {
        return {
            id: user.id!,
            name: user.name,
            email: user.email,
            mobile: user.mobile!,
            role: user.role,
            kycStatus: user.kycStatus,
            walletBalance: user.walletBalance,
            isBlocked: user.isBlocked,
            createdAt: user.createdAt,
            rejectReason: user?.rejectReason || null,
            kyc: kyc ? {
                id: kyc._id!,
                subjectId: kyc.subjectId,
                subjectType: kyc.subjectType,
                idType: kyc.idType,
                idNumberEncrypted: kyc.idNumberEncrypted,
                documentUrl: kyc.documentUrl,
                selfieUrl: kyc.selfieUrl,
                status: kyc.status,
                createdAt: kyc.createdAt,
                reviewedAt: kyc.reviewedAt
            } : null
        }
    }
}