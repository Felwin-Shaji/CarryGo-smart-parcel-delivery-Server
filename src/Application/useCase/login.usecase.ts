import { inject, injectable } from "tsyringe";
import type { ILoginUsecase } from "../interfaces/useCase/login.usecase.js";
import type { IUserRepository } from "../interfaces/repositories/user/user.repository.js";
import type { AuthUser } from "../../Infrastructure/Types/types.js";
import { AppError } from "../../Domain/utils/customError.js";
import { PasswordVo } from "../../Domain/ValueObjects/password.valueObject.js";
import type { LoginDTO } from "../Dto/Auth/Auth.dto.js";
import { STATUS } from "../../Infrastructure/constants/statusCodes.js";
import type { IAdminRepository } from "../interfaces/repositories/admin/admin.repository.js";
import type { IAgencyRepository } from "../interfaces/repositories/agency/agency.repository.js";

@injectable()
export class LoginUsecase implements ILoginUsecase {
    constructor(
        @inject("IUserRepository") private userRepo: IUserRepository,
        @inject("IAdminRepository") private adminRepo:IAdminRepository,
        @inject("IAgencyRepository") private agencyRepo:IAgencyRepository

    ) { }

    async execute(loginData: LoginDTO): Promise<AuthUser> {
        let user
        if (loginData.role === "user") user = await this.userRepo.findOne({ email: loginData.email });
        if(loginData.role === "admin")  user = await this.adminRepo.findOne({ email: loginData.email });
        if(loginData.role === "agency")  user = await this.agencyRepo.findOne({ email: loginData.email });

        if (!user) throw new AppError("User not found", STATUS.NOT_FOUND);

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