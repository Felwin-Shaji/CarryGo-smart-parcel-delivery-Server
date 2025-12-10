import { AgencyKYC } from "../../../Domain/Entities/Agency/AgencyKYC";
import { AgencyKYC_DTO, AgencyResubmitKycDTO } from "../../Dto/Agency/agency.dto";
import { Types } from "mongoose";

export class AgencyKYCMapper {
  
  static toEntity(dto: AgencyKYC_DTO, uploadedFiles: any): AgencyKYC {

    return {
      agencyId: new Types.ObjectId(dto.id),  
      tradeLicenseNumber: dto.tradeLicenseNumber,
      tradeLicenseDocument: uploadedFiles?.tradeLicenseDocument || null,
      PANnumber: dto.PANnumber,
      PAN_photo: uploadedFiles?.PAN_photo || null,
      gst_number: dto.gst_number,
      gst_certificate: uploadedFiles?.gst_certificate || null,
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
      tradeLicenseDocument: agencyKYC?.tradeLicenseDocument ,
      PAN_photo: agencyKYC?.PAN_photo ,
      gst_certificate: agencyKYC?.gst_certificate ,
    };
  }
}
