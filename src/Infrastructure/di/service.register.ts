import { container } from "tsyringe";
import type { IMailService } from "../../Application/interfaces/services_Interfaces/email-service.interface.js";
import { MailService } from "../services/sendEmial.service.js";
import type { ITokenService } from "../../Application/interfaces/services_Interfaces/token-service.interface.js";
import { TokenService } from "../services/token.service.js";
import { IStorageService } from "../../Application/interfaces/services_Interfaces/storage-service.interface.js";
import { StorageService } from "../services/storage/CloudinaryStorageService.js";
import { IPasswordService } from "../../Application/interfaces/services_Interfaces/password-service.interface.js";
import { PasswordService } from "../services/Password.service.js";
import { IOtpService } from "../../Application/interfaces/services_Interfaces/otp-service.interface.js";
import { OtpService } from "../services/otp.service.js";
import { IPincodeLookupService } from "../../Application/interfaces/services_Interfaces/pincodeLookupService.interface.js";
import { PincodeLookupService } from "../services/Apis/IndiaPostProvider.js";
import { IGeocodingService } from "../../Application/interfaces/services_Interfaces/IGeocodingService.js";
import { GeocodingService } from "../services/Apis/Geocoding.service.js";
import { IDistanceService } from "../../Application/interfaces/services_Interfaces/IDistanceService.js";
import { DistanceService } from "../services/Distance.Service.js";
import { PricingService } from "../services/Pricing.service.js";
import { IPricingService } from "../../Application/interfaces/services_Interfaces/IPricingService.js";

export class ServiceRegistory {
    static registerServices(): void {

        container.register<IMailService>("IMailService", {
            useClass: MailService
        })

        container.register<ITokenService>("ITokenService", {
            useClass: TokenService
        })

        container.register<IStorageService>("IStorageService", {
            useClass: StorageService
        })

        container.register<IPasswordService>("IPasswordService", {
            useClass: PasswordService
        });

        container.register<IOtpService>("IOtpService", {
            useClass: OtpService
        });

        container.register<IPincodeLookupService>("IPincodeLookupService", {
            useClass: PincodeLookupService
        });

        container.register<IGeocodingService>("IGeocodingService", {
            useClass: GeocodingService
        });

        container.register<IDistanceService>("IDistanceService", {
            useClass: DistanceService
        });

        container.register<IPricingService>("IPricingService",{
            useClass:PricingService
        });
    }
}