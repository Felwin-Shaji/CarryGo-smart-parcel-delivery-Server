import { Agency } from "../../../Domain/Entities/Agency/Agency";
import { AgencyResponseDTO, AgencyWithKYCResponseDTO, } from "../../Dto/Agency/agency.dto";
import { AgencyWithKYC_DB_Result } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";

export class AgencyMapper {

    static toResponseDTO(agency: Agency): AgencyResponseDTO {
        return {
            id: agency.id!,
            name: agency.name,
            email: agency.email,
            mobile: agency.mobile!,
            isBlocked: agency.isBlocked,
            kycStatus: agency.kycStatus,
            createdAt: agency.createdAt,
        };
    }

    static toResponseWithKycDTO(agency: AgencyWithKYC_DB_Result): AgencyWithKYCResponseDTO {
        return {
            id: agency.id!,
            name: agency.name,
            email: agency.email,
            mobile: agency.mobile!,
            isBlocked: agency.isBlocked,
            kycStatus: agency.kycStatus,
            createdAt: agency.createdAt,

            kyc: agency.kyc
                ? {
                    id: agency.kyc.id!,
                    PAN_photo: agency.kyc.PAN_photo,
                    PANnumber: agency.kyc.PANnumber,
                    gst_certificate: agency.kyc.gst_certificate,
                    gst_number: agency.kyc.gst_number,
                    tradeLicenseDocument: agency.kyc.tradeLicenseDocument,
                    tradeLicenseNumber: agency.kyc.tradeLicenseNumber,
                    status: agency.kyc.status,
                    createdAt: agency.kyc.createdAt ?? null,
                    updatedAt: agency.kyc.updatedAt ?? null
                }
                : null
        };
    }

}