import { User } from "../../../Domain/Entities/User";
import { IWrokerKYCVerification } from "../../../Domain/Entities/Worker/WorkerKyc";
import { GetTravelerKycResponseDTO } from "../../Dto/User/user.dto";

export class TravelerMapper {
    static toGetTravelerKycResponseDTO(kyc: IWrokerKYCVerification,user:User): GetTravelerKycResponseDTO {
        return  {
            idType: kyc.idType,
            idNumber:kyc.idNumberEncrypted,
            documentUrl: kyc.documentUrl,
            selfieUrl: kyc.selfieUrl,
            rejectionReason: user.kycStatus === "REJECTED" ? user.rejectReason : null
        };

    }
}