import { inject, injectable } from "tsyringe";
import { IUpdateUserStatusUseCase } from "../../Interfaces/UseCases/User/UpdateUserStatus.usecase";
import { IUserRepository } from "../../Interfaces/Repositories/User/user.repository";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessage";

@injectable()
export class UpdateUserStatusUseCase implements IUpdateUserStatusUseCase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
    ) { }
    async execute(userId: string, isBlocked: boolean): Promise<void> {
        const user = await this._userRepo.findById({ _id: userId });
        if (!user) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const newTokenVersion = user.tokenVersion+1

        await this._userRepo.findOneAndUpdate({ _id: userId }, { isBlocked: isBlocked, tokenVersion: newTokenVersion })

    }
} 