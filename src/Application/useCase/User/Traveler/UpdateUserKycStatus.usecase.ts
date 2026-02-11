import { inject, injectable } from "tsyringe";
import { IUpdateUserKycStatusUseCase } from "../../../interfaces/useCase_Interfaces/user/IUpdateuSERKycStatusUseCase";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { KYCStatus } from "../../../../Infrastructure/Types/types";
import { updateUserKycStatusDTO } from "../../../Dto/User/user.dto";
import { AppError } from "../../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";

@injectable()
export class UpdateUserKycStatusUseCase implements IUpdateUserKycStatusUseCase {
    constructor(
        @inject("IUserRepository") private _userRepository: IUserRepository
    ) { }
    async execute(userId: string, dto: updateUserKycStatusDTO): Promise<KYCStatus> {
        const user = await this._userRepository.findById({ _id: userId });
        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        user.kycStatus = dto.kycStatus;
        user.rejectReason = dto.rejectReason || null;
        const updatedUser = await this._userRepository.findOneAndUpdate(
            { _id: userId },
            user
        );
        if (!updatedUser) throw new AppError(USER_MESSAGES.UPDATE_FAILED, STATUS.INTERNAL_SERVER_ERROR);

        return updatedUser.kycStatus;
    }
}