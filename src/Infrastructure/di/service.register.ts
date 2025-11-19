import { container } from "tsyringe";
import type { IMailService } from "../../Application/interfaces/services_Interfaces/email-service.interface.js";
import { MailService } from "../services/sendEmial.service.js";
import type { ITokenService } from "../../Application/interfaces/services_Interfaces/token-service.interface.js";
import { TokenService } from "../services/token.service.js";
import { IStorageService } from "../../Application/interfaces/services_Interfaces/storage-service.interface.js";
import { StorageService } from "../services/storage/CloudinaryStorageService.js";

export class ServiceRegistory {
    static registerServices(): void {

        container.register<IMailService>("IMailService", {
            useClass: MailService
        })

        container.register<ITokenService>("ITokenService",{
            useClass:TokenService
        })

        container.register<IStorageService>("IStorageService",{
            useClass:StorageService
        })

    }
}