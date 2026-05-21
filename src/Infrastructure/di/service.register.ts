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
import { IRouteComputationService } from "../../Application/interfaces/services_Interfaces/IRouteComputationService";
import { RouteComputationService } from "../services/Logistics/RouteComputationService";
import { IHubShipmentAssignmentService } from "../../Application/interfaces/services_Interfaces/IHubShipmentAssignmentService";
import { HubShipmentAssignmentService } from "../services/Logistics/HubShipmentAssignment.service";
import { IBookingIdGeneratorService } from "../../Application/interfaces/services_Interfaces/IBookingIdGeneratorService";
import { BookingIdGeneratorService } from "../services/BookingIdGenerator.service";
import { IMessageSocketService } from "../../Application/interfaces/services_Interfaces/Chat/IMessageSocketService";
import { SocketService } from "../services/Chat/Socket.service";
import { IReportGenerator } from "../../Application/interfaces/services_Interfaces/Report/IReportService";
import { ExcelReportGeneratorService } from "../services/Report/Agency/ExcelReportGenerator.service";
import { PdfReportGeneratorService } from "../services/Report/Agency/PdfReportGenerator.service";
import { INotificationService } from "../../Application/interfaces/services_Interfaces/Notification/INotificationService";
import { NotificationService } from "../services/Notification/Notification.service";
import { INotificationSocketService } from "../../Application/interfaces/services_Interfaces/Notification/INotificationSocketService";
import { NotificationSocketService } from "../services/Notification/NotificationSocket.service";
import { IGoogleAuthService } from "../../Application/interfaces/services_Interfaces/GoogleAuth/IGoogleAuthService";
import { GoogleAuthService } from "../services/GoogleAuth/GoogleAuth.service";
import { SalesReportResponseDTO } from "../../Application/Dto/Agency/agencyDashboard.dto";
import { AdminBookingsReportResponseDTO } from "../../Application/Dto/Admin/adminDashboard.dto";
import { AdminExcelBookingsReportGenerator } from "../services/Report/Admin/AdminExcelBookingsReportGenerator";
import { AdminPdfBookingsReportGenerator } from "../services/Report/Admin/AdminPdfBookingsReportGenerator";

type ReportGenerators = {
    excel: IReportGenerator<SalesReportResponseDTO>;
    pdf: IReportGenerator<SalesReportResponseDTO>;
};

type AdminReportGenerators = {
    excel: IReportGenerator<AdminBookingsReportResponseDTO>;
    pdf: IReportGenerator<AdminBookingsReportResponseDTO>;
};

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

        container.register<IPaymentGatewayService>("IPaymentGatewayService", {
            useClass: RazorpayPaymentGateway
        })

        container.register<IRouteComputationService>("IRouteComputationService", {
            useClass: RouteComputationService
        });

        container.register<IHubShipmentAssignmentService>("IHubShipmentAssignmentService", {
            useClass: HubShipmentAssignmentService
        })

        container.register<IBookingIdGeneratorService>("IBookingIdGeneratorService", {
            useClass: BookingIdGeneratorService
        })

        container.register<IMessageSocketService>("IMessageSocketService", {
            useClass: SocketService
        });

        container.register<IReportGenerator<SalesReportResponseDTO>>("ExcelReportGeneratorService", {
            useClass: ExcelReportGeneratorService,
        });

        container.register<IReportGenerator<SalesReportResponseDTO>>("PdfReportGeneratorService", {
            useClass: PdfReportGeneratorService,
        });

        container.register<IReportGenerator<AdminBookingsReportResponseDTO>>("AdminExcelBookingsReportGenerator", {
            useClass: AdminExcelBookingsReportGenerator,
        });

        container.register<IReportGenerator<AdminBookingsReportResponseDTO>>("AdminPdfBookingsReportGenerator", {
            useClass: AdminPdfBookingsReportGenerator,
        });

        container.register<ReportGenerators>("ReportGenerators", {
            useFactory: (c) => ({
                excel: c.resolve<IReportGenerator<SalesReportResponseDTO>>("ExcelReportGeneratorService"),
                pdf: c.resolve<IReportGenerator<SalesReportResponseDTO>>("PdfReportGeneratorService"),
            }),
        });

        container.register<AdminReportGenerators>("AdminReportGenerators", {
            useFactory: (c) => ({
                excel: c.resolve<IReportGenerator<AdminBookingsReportResponseDTO>>("AdminExcelBookingsReportGenerator"),
                pdf: c.resolve<IReportGenerator<AdminBookingsReportResponseDTO>>("AdminPdfBookingsReportGenerator"),
            }),
        });

        container.register<INotificationService>("INotificationService", {
            useClass: NotificationService
        });

        container.register<INotificationSocketService>("INotificationSocketService", {
            useClass: NotificationSocketService
        });

        container.register<IGoogleAuthService>("IGoogleAuthService", {
            useClass: GoogleAuthService
        })
    }
}