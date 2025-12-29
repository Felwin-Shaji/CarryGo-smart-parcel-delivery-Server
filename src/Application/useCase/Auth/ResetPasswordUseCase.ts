import { inject, injectable } from "tsyringe";
import { IResetPasswordUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/resetPassword.usecase";
import { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { ITokenService } from "../../interfaces/services_Interfaces/token-service.interface";
import { Role } from "../../../Infrastructure/Types/types";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface";
import { IResetTokenRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/resetToken.repository";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { PASSWORD_RESET_MESSAGES } from "../../../Infrastructure/constants/messages/passwordResetMessage";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,


        @inject("IResetTokenRepository") private _resetTokenRepo: IResetTokenRepository,

        @inject("IPasswordService") private _passwordService: IPasswordService,
        @inject("ITokenService") private _tokenService: ITokenService
    ) { }

    async execute(dto: { token: string; newPassword: string; role: Role; }): Promise<void> {
        const { token, newPassword, role } = dto;

        const jwtPayload = this._tokenService.verifyForgotPasswordToken(token);
        if (!jwtPayload) throw new AppError(PASSWORD_RESET_MESSAGES.INVALID_OR_EXPIRED_TOKEN, STATUS.UNAUTHORIZED);

        const decodedToken = decodeURIComponent(dto.token);
        const storedToken = await this._resetTokenRepo.findOne({ token: decodedToken });
        if (!storedToken) throw new AppError(PASSWORD_RESET_MESSAGES.RESET_LINK_INVALID, STATUS.BAD_REQUEST);

        if (!storedToken.createdAt || !storedToken.expiresInSeconds) throw new AppError(PASSWORD_RESET_MESSAGES.SESSION_EXPIRED, STATUS.BAD_REQUEST)

        const expireDate = new Date(storedToken.createdAt.getTime() + storedToken.expiresInSeconds * 1000);
        if (expireDate < new Date()) {
            await this._resetTokenRepo.delete({ userId: jwtPayload.userId, token });
            throw new AppError(PASSWORD_RESET_MESSAGES.RESET_LINK_EXPIRED, STATUS.BAD_REQUEST);
        }

        let user;

        if (role === "user") user = await this._userRepo.findById({ _id: jwtPayload.userId });
        if (role === "admin") user = await this._adminRepo.findById({ _id: jwtPayload.userId });
        if (role === "agency") user = await this._agencyRepo.findById({ _id: jwtPayload.userId });
        if (role === "hub") user = await this._hubRepo.findById({ _id: jwtPayload.userId });
        if (role === "worker") user = await this._workerRepo.findById({ _id: jwtPayload.userId });

        if (!user) throw new AppError(PASSWORD_RESET_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);

        const hashedPassword = await this._passwordService.hashPassword(newPassword);


        if (role === "user") await this._userRepo.findOneAndUpdate({ _id: jwtPayload.userId }, { password: hashedPassword });
        if (role === "admin") await this._adminRepo.findOneAndUpdate({ _id: jwtPayload.userId }, { password: hashedPassword });
        if (role === "agency") await this._agencyRepo.findOneAndUpdate({ _id: jwtPayload.userId }, { password: hashedPassword });
        if (role === "hub") await this._hubRepo.findOneAndUpdate({ _id: jwtPayload.userId }, { password: hashedPassword });
        if (role === "worker") await this._workerRepo.findOneAndUpdate({ _id: jwtPayload.userId }, { password: hashedPassword });

        await this._resetTokenRepo.delete({ token });
    }
} 