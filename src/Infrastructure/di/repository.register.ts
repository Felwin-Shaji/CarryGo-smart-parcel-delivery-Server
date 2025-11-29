
import { container } from "tsyringe";

import { OtpRepository } from "../repositories/otpRepository.js";
import type { IOtpRepository } from "../../Application/interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository.js";
import { UserRepository } from "../repositories/userRepository.js";
import type { IUserRepository } from "../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository.js";
import type { IRefreshTokenRepository } from "../../Application/interfaces/repositories_interfaces/authRepositories_Interfaces/refreshToken.repository.js";
import { RefreshTokenRepository } from "../repositories/refreshTokenRepository.js";
import type { IAdminRepository } from "../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository.js";
import { AdminRepository } from "../repositories/adminRepository.js";
import type { IAgencyRepository } from "../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository.js";
import { IAgencyKYCRepository } from "../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/AgencyKYC.js";
import { AgencyKYCRepository } from "../repositories/Agency/AgencyKYCRepository.js";
import { AgencyRepository } from "../repositories/Agency/agencyRepository.js";
import { IHubRepository } from "../../Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository.js";
import { HubRepository } from "../repositories/Hub/hubRepository.js";
import { IHubTempRepository } from "../../Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hubTemp.repository.js";
import { HubTempRepository } from "../repositories/Hub/hubTempRepository.js";
import { IResetTokenRepository } from "../../Application/interfaces/repositories_interfaces/authRepositories_Interfaces/resetToken.repository.js";
import { ResetTokenRepository } from "../repositories/resetTokenRepository.js";
import { IHubWorkerKycRepository } from "../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository.js";
import { HubWorkerKycRepository } from "../repositories/Worker/hubWorkerKycRepository.js";
import { IHubWorkersTempRepository } from "../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/worersTemp.repository.js";
import { HubWorkersTempRepository } from "../repositories/Worker/hubWorkersTempRepository.js";
import { IHubWorkerRepository } from "../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository.js";
import { HubWorkerRepository } from "../repositories/Worker/hubWorkerRepository.js";


export class RepositoryRegistry {
    static registerRepositories(): void {

        container.register<IOtpRepository>("IOtpRepository", {
            useClass: OtpRepository
        });

        container.register<IUserRepository>("IUserRepository", {
            useClass: UserRepository
        });

        container.register<IAgencyRepository>("IAgencyRepository", {
            useClass: AgencyRepository
        });

        container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
            useClass: RefreshTokenRepository
        });

        container.register<IResetTokenRepository>("IResetTokenRepository", {
            useClass: ResetTokenRepository
        });

        container.register<IAdminRepository>("IAdminRepository", {
            useClass: AdminRepository
        });

        container.register<IAgencyKYCRepository>("IAgencyKYCRepository", {
            useClass: AgencyKYCRepository
        });

        container.register<IHubTempRepository>("IHubTempRepository", {
            useClass: HubTempRepository
        });

        container.register<IHubRepository>("IHubRepository", {
            useClass: HubRepository
        });

        container.register<IHubWorkersTempRepository>("IHubWorkersTempRepository",{
            useClass:HubWorkersTempRepository
        })

        container.register<IHubWorkerRepository>("IHubWorkerRepository",{
            useClass:HubWorkerRepository
        })

        container.register<IHubWorkerKycRepository>("IHubWorkerKycRepository",{
            useClass:HubWorkerKycRepository
        })

    };
};