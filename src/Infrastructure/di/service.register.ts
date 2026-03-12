import { container } from "tsyringe";
import type { IMailService } from "../../Application/interfaces/services_Interfaces/email-service.interface";
import { MailService } from "../services/sendEmial.service";
import type { ITokenService } from "../../Application/interfaces/services_Interfaces/token-service.interface";
import { TokenService } from "../services/token.service";
import { IStorageService } from "../../Application/interfaces/services_Interfaces/storage-service.interface";
import { StorageService } from "../services/storage/CloudinaryStorageService";
import { IPasswordService } from "../../Application/interfaces/services_Interfaces/password-service.interface";
import { PasswordService } from "../services/Password.service";
import { IOtpService } from "../../Application/interfaces/services_Interfaces/otp-service.interface";
import { OtpService } from "../services/otp.service";
import { IPincodeLookupService } from "../../Application/interfaces/services_Interfaces/pincodeLookupService.interface";
import { PincodeLookupService } from "../services/Apis/IndiaPostProvider";
import { IGeocodingService } from "../../Application/interfaces/services_Interfaces/IGeocodingService";
import { GeocodingService } from "../services/Apis/Geocoding.service";
import { IDistanceService } from "../../Application/interfaces/services_Interfaces/IDistanceService";
import { DistanceService } from "../services/Distance.Service";
import { IPaymentGatewayService } from "../../Application/interfaces/services_Interfaces/payment/IPaymentGateway";
import { RazorpayPaymentGateway } from "../services/Payment/RazorpayPaymentGateway";
import { IWalletService } from "../../Application/interfaces/services_Interfaces/IWalletService";
import { WalletService } from "../services/Payment/wallet.services";

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

        container.register<IPaymentGatewayService>("IPaymentGatewayService",{
            useClass:RazorpayPaymentGateway
        })

        container.register<IWalletService>("IWalletService",{
            useClass:WalletService
        });
    }
}