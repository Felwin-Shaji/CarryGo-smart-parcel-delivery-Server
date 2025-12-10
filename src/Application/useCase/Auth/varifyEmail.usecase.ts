import { inject, injectable } from "tsyringe";
import { IVarifyEmailUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/varifyEmail.usecase";
import { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { Role } from "../../../Infrastructure/Types/types";
import { IMailService } from "../../interfaces/services_Interfaces/email-service.interface";
import { ITokenService } from "../../interfaces/services_Interfaces/token-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IResetTokenRepository } from "../../interfaces/repositories_interfaces/authRepositories_Interfaces/resetToken.repository";
import { ITokenModel } from "../../../Domain/Entities/token";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";


@injectable()
export class VarifyEmailUseCase implements IVarifyEmailUseCase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,
                @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,


        @inject("IResetTokenRepository") private _resetTokenRepo: IResetTokenRepository,

        @inject("IMailService") private _mailer: IMailService,
        @inject("ITokenService") private _tokenService: ITokenService,


    ) { }

    async execute(dto: { email: string, role: Role }): Promise<string | null> {

        let user;
        if (dto.role === "user") user = await this._userRepo.findOne({ email: dto.email });
        if (dto.role === "admin") user = await this._adminRepo.findOne({ email: dto.email });
        if (dto.role === "agency") user = await this._agencyRepo.findOne({ email: dto.email });
        if (dto.role === "hub") user = await this._hubRepo.findOne({ email: dto.email });
        if (dto.role === "worker") user = await this._workerRepo.findOne({ email: dto.email });

        if (!user) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);

        const resetToken = this._tokenService.generateForgotPasswordToken({
            userId: user._id,
            email: user.email,
            role: user.role
        });

        const data: ITokenModel = {
            userId: user._id!,
            token: resetToken,
            role: user.role,
            createdAt: new Date(),
            expiresInSeconds: 300,
        }

        await this._resetTokenRepo.save(data)

        const encodedToken = encodeURIComponent(resetToken);
        
        let resetUrl:string;
        if (dto.role === 'user') resetUrl = `${process.env.CLIENT_URL}/reset-password/${encodedToken}?role=${dto.role}`;
        else resetUrl = `${process.env.CLIENT_URL}/${dto.role}/reset-password/${encodedToken}?role=${dto.role}`;


        console.log('-----------reset url---------------')
        console.log(resetUrl)
        console.log('-----------------------------------')

        await this._mailer.sendResetPasswordUrl(dto.email, resetUrl);

        return resetUrl;
    }
}