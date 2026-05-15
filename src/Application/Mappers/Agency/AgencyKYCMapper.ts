import { AppError } from "../../../Domain/utils/customError";
import { AgencyKYC } from "../../../Domain/Entities/Agency/AgencyKYC";
import { AgencyKYC_DTO, AgencyResubmitKycDTO, UploadedKycFiles } from "../../Dto/Agency/agency.dto";
import { Types } from "mongoose";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";

export class AgencyKYCMapper {

  static toEntity(dto: AgencyKYC_DTO, uploadedFiles: UploadedKycFiles): AgencyKYC {

    if (
      !uploadedFiles?.tradeLicenseDocument ||
      !uploadedFiles?.PAN_photo ||
      !uploadedFiles?.gst_certificate
    ) {
      throw new AppError(AGENCY_MESSAGES.AGENCY_KYC_NOT_FOUND,STATUS.BAD_REQUEST);
    }


    return {
      agencyId: new Types.ObjectId(dto.id),
      tradeLicenseNumber: dto.tradeLicenseNumber,
      tradeLicenseDocument: uploadedFiles?.tradeLicenseDocument,
      PANnumber: dto.PANnumber,
      PAN_photo: uploadedFiles?.PAN_photo,
      gst_number: dto.gst_number,
      gst_certificate: uploadedFiles?.gst_certificate,
      status: "PENDING",
      createdAt: new Date(),
    };
  }

  static toAgencyKycResponseDTO(agencyKYC: AgencyKYC): AgencyKYC_DTO {
    return {
      id: agencyKYC.agencyId.toString(),
      tradeLicenseNumber: agencyKYC.tradeLicenseNumber,
      PANnumber: agencyKYC.PANnumber,
      gst_number: agencyKYC.gst_number,
      status: agencyKYC.status,
    };
  }


  static toResubmitDTO(agencyKYC: AgencyKYC): AgencyResubmitKycDTO {
    return {
      agencyId: agencyKYC.agencyId.toString(),
      tradeLicenseNumber: agencyKYC.tradeLicenseNumber,
      PANnumber: agencyKYC.PANnumber,
      gst_number: agencyKYC.gst_number,
      tradeLicenseDocument: agencyKYC?.tradeLicenseDocument,
      PAN_photo: agencyKYC?.PAN_photo,
      gst_certificate: agencyKYC?.gst_certificate,
    };
  }
}
