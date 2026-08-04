import { container } from "tsyringe";
import type { IMailService } from "../../Application/Interfaces/Services/IEmailService";
import { MailService } from "../Services/sendEmial.service";
import type { ITokenService } from "../../Application/Interfaces/Services/ITokenService";
import { TokenService } from "../Services/token.service";
import { IStorageService } from "../../Application/Interfaces/Services/IStorageService";
import { StorageService } from "../Services/Storage/CloudinaryStorageService";
import { IPasswordService } from "../../Application/Interfaces/Services/IPasswordService";
import { PasswordService } from "../Services/Password.service";
import { IOtpService } from "../../Application/Interfaces/Services/IOTPService";
import { OtpService } from "../Services/otp.service";
import { IPincodeLookupService } from "../../Application/Interfaces/Services/IPincodeLookupService";
import { PincodeLookupService } from "../Services/APIs/IndiaPostProvider";
import { IGeocodingService } from "../../Application/Interfaces/Services/IGeocodingService";
import { GeocodingService } from "../Services/APIs/Geocoding.service";
import { IDistanceService } from "../../Application/Interfaces/Services/IDistanceService";
import { DistanceService } from "../Services/Distance.Service";
import { IPaymentGatewayService } from "../../Application/Interfaces/Services/Payment/IPaymentGateway";
import { RazorpayPaymentGateway } from "../Services/Payment/RazorpayPaymentGateway";
import { IRouteComputationService } from "../../Application/Interfaces/Services/IRouteComputationService";
import { RouteComputationService } from "../Services/Logistics/RouteComputationService";
import { IHubShipmentAssignmentService } from "../../Application/Interfaces/Services/IHubShipmentAssignmentService";
import { HubShipmentAssignmentService } from "../Services/Logistics/HubShipmentAssignment.service";
import { IBookingIdGeneratorService } from "../../Application/Interfaces/Services/IBookingIdGeneratorService";
import { BookingIdGeneratorService } from "../Services/BookingIdGenerator.service";
import { IMessageSocketService } from "../../Application/Interfaces/Services/Chat/IMessageSocketService";
import { SocketService } from "../Services/Chat/Socket.service";
import { IReportGenerator } from "../../Application/Interfaces/Services/Report/IReportService";
import { ExcelReportGeneratorService } from "../Services/Report/Agency/ExcelReportGenerator.service";
import { PdfReportGeneratorService } from "../Services/Report/Agency/PdfReportGenerator.service";
import { INotificationService } from "../../Application/Interfaces/Services/Notification/INotificationService";
import { NotificationService } from "../Services/Notification/Notification.service";
import { INotificationSocketService } from "../../Application/Interfaces/Services/Notification/INotificationSocketService";
import { NotificationSocketService } from "../Services/Notification/NotificationSocket.service";
import { IGoogleAuthService } from "../../Application/Interfaces/Services/GoogleAuth/IGoogleAuthService";
import { GoogleAuthService } from "../Services/GoogleAuth/GoogleAuth.service";
import { SalesReportResponseDTO } from "../../Application/DTOs/Agency/AgencyDashboardDTO";
import { AdminBookingsReportResponseDTO } from "../../Application/DTOs/Admin/AdminDashboardDTO";
import { AdminExcelBookingsReportGenerator } from "../Services/Report/Admin/AdminExcelBookingsReportGenerator";
import { AdminPdfBookingsReportGenerator } from "../Services/Report/Admin/AdminPdfBookingsReportGenerator";
import { AdminReportGenerators, ReportGenerators } from "../Types/reportGenerator.types";


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