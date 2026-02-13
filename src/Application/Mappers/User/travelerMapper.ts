import { User } from "../../../Domain/Entities/User";
import { Address } from "../../../Domain/Entities/User/Address";
import { TravelRequest } from "../../../Domain/Entities/User/TravelRequest";
import { IWrokerKYCVerification } from "../../../Domain/Entities/Worker/WorkerKyc";
import { CreateTravelRequestDTO } from "../../Dto/User/traveler.dto";
import { GetTravelerKycResponseDTO } from "../../Dto/User/user.dto";

export class TravelerMapper {

    static toDomainTravelerKyc(dto: CreateTravelRequestDTO, travelerId: string, startAddress: Address, endAddress: Address): TravelRequest {
        const formattedStartAddress =
            startAddress.formattedAddress ??
            `${startAddress.addressLine1}, ${startAddress.city}`;

        const formattedEndAddress =
            endAddress.formattedAddress ??
            `${endAddress.addressLine1}, ${endAddress.city}`;

        return new TravelRequest(
            null,
            travelerId,
            startAddress.location,
            formattedStartAddress,
            endAddress.location,
            formattedEndAddress,
            new Date(dto.departureAt),
            dto.arrivalAt ? new Date(dto.arrivalAt) : null,
            dto.capacityKg,
            dto.capacityKg,
            dto.allowedPackageSizes, // must be array in entity
            null,
            dto.modeOfTransport,
            dto.description ?? null,
            "DRAFT"
        );

    }

    static toGetTravelerKycResponseDTO(kyc: IWrokerKYCVerification, user: User): GetTravelerKycResponseDTO {
        return {
            idType: kyc.idType,
            idNumber: kyc.idNumberEncrypted,
            documentUrl: kyc.documentUrl,
            selfieUrl: kyc.selfieUrl,
            rejectionReason: user.kycStatus === "REJECTED" ? user.rejectReason : null
        };
    }
}