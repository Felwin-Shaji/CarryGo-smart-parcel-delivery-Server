import { AgencyKYC } from "../../../Domain/Entities/Agency/AgencyKYC";
import { AgencyKYC_DTO } from "../../Dto/Agency/agency.dto";
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
}
