import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import type { AuthUserDTO } from "../../../Infrastructure/Types/CommonTypes";
import { AppError } from "../../../Domain/Utils/customError";
import type { LoginDTO } from "../../DTOs/Auth/AuthDTO";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import type { IAdminRepository } from "../../Interfaces/Repositories/Admin/IAdminRepository";
import type { IAgencyRepository } from "../../Interfaces/Repositories/Agency/IAgencyRepository";
import { ILoginUsecase } from "../../Interfaces/UseCases/Auth/ILoginUseCase";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";
import { IPasswordService } from "../../Interfaces/Services/IPasswordService";
import { AUTH_MESSAGES } from "../../../Infrastructure/Constants/Messages/authMessages";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/IHubWorkerRepository";

@injectable()
export class LoginUsecase implements ILoginUsecase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,

        @inject("IPasswordService") private _passwordService: IPasswordService
    ) { }

    async execute(loginData: LoginDTO): Promise<AuthUserDTO> {
        let user
        if (loginData.role === "user") user = await this._userRepo.findOne({ email: loginData.email });
        if (loginData.role === "admin") user = await this._adminRepo.findOne({ email: loginData.email });
        if (loginData.role === "agency") user = await this._agencyRepo.findOne({ email: loginData.email });
        if (loginData.role === "hub") user = await this._hubRepo.findOne({ email: loginData.email });
        if (loginData.role === "worker") user = await this._workerRepo.findOne({ email: loginData.email });

        if (!user) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);
        if (user.isBlocked) throw new AppError(AUTH_MESSAGES.USER_BLOCKED, STATUS.UNAUTHORIZED);
        if (!user.password) throw new AppError(AUTH_MESSAGES.WRONG_PASSWORD, STATUS.BAD_REQUEST)

        const isMatchPassword = await this._passwordService.comparePassword(loginData.password, user.password)
        if (!isMatchPassword) throw new AppError(AUTH_MESSAGES.WRONG_PASSWORD, STATUS.UNAUTHORIZED);

        return user as AuthUserDTO
    }
}