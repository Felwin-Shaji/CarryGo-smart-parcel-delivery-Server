import { container } from "tsyringe";
import type { IMailService } from "../../Application/interfaces/services/email-service.interface.js";
import { MailService } from "../services/sendEmial.service.js";
import type { ITokenService } from "../../Application/interfaces/services/token-service.interface.js";
import { TokenService } from "../services/token.service.js";

export class ServiceRegistory {
    static registerServices(): void {

        container.register<IMailService>("IMailService", {
            useClass: MailService
        })

        container.register<ITokenService>("ITokenService",{
            useClass:TokenService
        })

    }
}