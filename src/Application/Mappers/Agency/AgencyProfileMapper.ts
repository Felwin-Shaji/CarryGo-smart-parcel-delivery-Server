import { Agency } from "../../../Domain/Entities/Agency/Agency";
import { AgencyProfileResponseDTO } from "../../Dto/Agency/agencyProfile.dto";


export class AgencyProfileMapper {
    static toGetAgencyProfileResponseDTO(
        agency: Agency
    ): AgencyProfileResponseDTO {
        return {
            id: agency.id!,
            name: agency.name,
            email: agency.email,
            mobile: agency.mobile!,
            role: agency.role,
            createdAt: agency.createdAt,
            kycStatus: agency.kycStatus,
            isBlocked: agency.isBlocked
        };
    }
}
