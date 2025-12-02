import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import type { AuthUserDTO } from "../../../Infrastructure/Types/types.js";
import { AppError } from "../../../Domain/utils/customError.js";
import type { LoginDTO } from "../../Dto/Auth/Auth.dto.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";
import type { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository.js";
import type { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository.js";
import { ILoginUsecase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/login.usecase.js";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository.js";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface.js";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages.js";

@injectable()
export class LoginUsecase implements ILoginUsecase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,

        @inject("IPasswordService") private _passwordService:IPasswordService

    ) { }

    async execute(loginData: LoginDTO): Promise<AuthUserDTO> {
        let user
        if (loginData.role === "user") user = await this._userRepo.findOne({ email: loginData.email });
        if (loginData.role === "admin") user = await this._adminRepo.findOne({ email: loginData.email });
        if (loginData.role === "agency") user = await this._agencyRepo.findOne({ email: loginData.email });
        if (loginData.role === "hub") user = await this._hubRepo.findOne({ email: loginData.email });

        if (!user) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);
        if (user.isBlocked) throw new AppError(AUTH_MESSAGES.USER_BLOCKED, STATUS.UNAUTHORIZED);

        const isMatchPassword = this._passwordService.comparePassword(loginData.password,user.password!)
        if (!isMatchPassword) throw new AppError(AUTH_MESSAGES.WRONG_PASSWORD, STATUS.UNAUTHORIZED);

        return user as AuthUserDTO
    }
}