import { Agency } from "../../Domain/Entities/Agency/Agency";
import { AppError } from "../../Domain/utils/customError";
import { AgencyKYCFileFields } from "../../Infrastructure/services/storage/multer";
import { AgencyKYC_DTO, AgencyKYCResponseDTO } from "../Dto/Agency/agency.dto";
import type { Request } from "express";


export class AgencyMapper {

    static toAgencyKycDTO(req: Request): AgencyKYC_DTO {
        if (!req.user) {
            throw new AppError("Authenticated user is missing");
        }
        const files = req.files as AgencyKYCFileFields;
        return {
            agencyId: req.user.id,
            tradeLicenseNumber: req.body.tradeLicenseNumber,
            tradeLicenseDocument: files.tradeLicenseDocument?.[0]?.buffer,
            PANnumber: req.body.PANnumber,
            PAN_photo: files.PAN_photo?.[0]?.buffer,
            gst_number: req.body.gst_number,
            gst_certificate: files.gst_certificate?.[0]?.buffer,
        };
    }

    static toAgencyKYCResponseDTO(agency:Agency): AgencyKYCResponseDTO {

        return {
            success: true,
            message: "KYC submitted successfully",
            user:{
                id:agency.id!,
                name:agency.name,
                email:agency.email,
                role:agency.role,
                kycStatus:agency.kycStatus
            },

        };
    }
}