import { inject, injectable } from "tsyringe";
import { IUpdateUserStatusUseCase } from "../../interfaces/useCase_Interfaces/user/UpdateUserStatus.usecase";
import { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class UpdateUserStatusUseCase implements IUpdateUserStatusUseCase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
    ) { }
    async execute(dto: { userId: string, isBlocked: boolean }): Promise<void> {
        const user = await this._userRepo.findById({ _id: dto.userId });
        if (!user) throw new AppError("User not found", STATUS.NOT_FOUND);

        await this._userRepo.findOneAndUpdate({ _id: dto.userId }, { isBlocked: dto.isBlocked })

    }
} 