import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import type { AuthUser } from "../../../Infrastructure/Types/types.js";
import { AppError } from "../../../Domain/utils/customError.js";
import { PasswordVo } from "../../../Domain/ValueObjects/password.valueObject.js";
import type { LoginDTO } from "../../Dto/Auth/Auth.dto.js";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";
import type { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository.js";
import type { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository.js";
import { ILoginUsecase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/login.usecase.js";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository.js";

@injectable()
export class LoginUsecase implements ILoginUsecase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAdminRepository") private _adminRepo:IAdminRepository,
        @inject("IAgencyRepository") private _agencyRepo:IAgencyRepository,
        @inject("IHubRepository") private _hubRepo:IHubRepository,


    ) { }

    async execute(loginData: LoginDTO): Promise<AuthUser> {
        let user
        if (loginData.role === "user") user = await this._userRepo.findOne({ email: loginData.email });
        if(loginData.role === "admin")  user = await this._adminRepo.findOne({ email: loginData.email });
        if(loginData.role === "agency")  user = await this._agencyRepo.findOne({ email: loginData.email });
        if(loginData.role === "hub")  user = await this._hubRepo.findOne({ email: loginData.email });

        if (!user) throw new AppError("User not found", STATUS.NOT_FOUND);
        if(user.isBlocked) throw new AppError(`${user.email} is blocked`,STATUS.UNAUTHORIZED);

        const passwordVo = PasswordVo.fromHashed(user.password!);
        const isMatch = await passwordVo.compare(loginData.password)
        if (!isMatch) throw new AppError("wrong password", STATUS.UNAUTHORIZED);

        const authUserDate: AuthUser = {
            id: user.id!,
            name: user.name,
            email: user.email,
            role: user.role,
            kycStatus:user.kycStatus,
        }

        return authUserDate
    }
}