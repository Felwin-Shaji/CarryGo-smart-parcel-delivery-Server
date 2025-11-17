
import { container } from "tsyringe";

import { OtpRepository } from "../repositories/otpRepository.js";
import type { IOtpRepository } from "../../Application/interfaces/repositories/auth/otp.repository.js";
import { UserRepository } from "../repositories/userRepository.js";
import type { IUserRepository } from "../../Application/interfaces/repositories/user/user.repository.js";
import type { IRefreshTokenRepository } from "../../Application/interfaces/repositories/auth/refreshToken.repository.js";
import { RefreshTokenRepository } from "../repositories/refreshTokenRepository.js";
import type { IAdminRepository } from "../../Application/interfaces/repositories/admin/admin.repository.js";
import { AdminRepository } from "../repositories/adminRepository.js";
import type { IAgencyRepository } from "../../Application/interfaces/repositories/agency/agency.repository.js";
import { AgencyRepository } from "../repositories/agencyRepository.js";


export class RepositoryRegistry {
    static registerRepositories(): void {

        container.register<IOtpRepository>("IOtpRepository", {
            useClass: OtpRepository
        })

        container.register<IUserRepository>("IUserRepository", {
            useClass: UserRepository
        })

        container.register<IAgencyRepository>("IAgencyRepository",{
            useClass:AgencyRepository
        })

        container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
            useClass: RefreshTokenRepository
        })

        container.register<IAdminRepository>("IAdminRepository",{
            useClass:AdminRepository
        })
    }
}