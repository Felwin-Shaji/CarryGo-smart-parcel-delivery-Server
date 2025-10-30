
import { container } from "tsyringe";

import { OtpRepository } from "../repositories/otpRepository.js";
import type { IOtpRepository } from "../../Application/interfaces/repositories/auth/otp.repository.js";
import { UserRepository } from "../repositories/userRepository.js";
import type { IUserRepository } from "../../Application/interfaces/repositories/user/user.repository.js";
import { MailService } from "../services/sendEmial.service.js";
import type { IMailService } from "../../Application/interfaces/services/email.service.js";

// export const otpRepository = new OtpRepository<Otp>(OtpModel)

// export const mailService = new MailService()
// export const userRepository = new UserRepository<User>(UserModel)

export class RepositoryRegistry {
    static registerRepositories(): void {

        container.register<IOtpRepository>("IOtpRepository", {
            useClass:OtpRepository
        })
        
        container.register<IMailService>("IMailService",{
            useClass:MailService
        })

        container.register<IUserRepository>("IUserRepository",{
            useClass:UserRepository
        })


    }
}