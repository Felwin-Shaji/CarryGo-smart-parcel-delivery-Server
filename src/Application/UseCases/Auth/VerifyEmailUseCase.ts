import { inject, injectable } from "tsyringe";
import { IVarifyEmailUseCase } from "../../Interfaces/UseCases/Auth/IVerifyEmailUseCase";
import { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import { IAdminRepository } from "../../Interfaces/Repositories/Admin/IAdminRepository";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/IAgencyRepository";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";
import { Role } from "../../../Infrastructure/Types/CommonTypes";
import { IMailService } from "../../Interfaces/Services/IEmailService";
import { ITokenService } from "../../Interfaces/Services/ITokenService";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { IResetPasswordTokenRepository } from "../../Interfaces/Repositories/Auth/IResetPasswordTokenRepository";
import { AUTH_MESSAGES } from "../../../Infrastructure/Constants/Messages/authMessages";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/IHubWorkerRepository";
import { IResetPasswordTokenModel } from "../../../Domain/Entities/IResetPasswordTokenModel";


@injectable()
export class VarifyEmailUseCase implements IVarifyEmailUseCase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,

        @inject("IResetPasswordTokenRepository") private _resetPasswordTokenRepo: IResetPasswordTokenRepository,

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
            userId: user.id,
            email: user.email,
            role: user.role
        });

        const data: IResetPasswordTokenModel = {
            userId: user.id!,
            token: resetToken,
            role: user.role,
            createdAt: new Date(),
            expiresInSeconds: 300,
        }

        await this._resetPasswordTokenRepo.save(data)

        const encodedToken = encodeURIComponent(resetToken);

        let resetUrl: string;
        if (dto.role === 'user') resetUrl = `${process.env.CLIENT_URL}/reset-password/${encodedToken}?role=${dto.role}`;
        else resetUrl = `${process.env.CLIENT_URL}/${dto.role}/reset-password/${encodedToken}?role=${dto.role}`;


        console.log('-----------reset url---------------')
        console.log(resetUrl)
        console.log('-----------------------------------')

        await this._mailer.sendResetPasswordUrl(dto.email, resetUrl);

        return resetUrl;
    }
}