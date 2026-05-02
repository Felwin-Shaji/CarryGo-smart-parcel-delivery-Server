import { HubProfileResponseDTO } from "@/Application/Dto/Hub/hubProfile.dto";
import { Hub } from "@/Domain/Entities/Hub/Hub";


export class HubProfileMapper {
    static toGetHubProfileResponseDTO(
        hub: Hub
    ): HubProfileResponseDTO {
        return {
            id: hub.id!,
            name: hub.name,
            email: hub.email,
            mobile: hub.mobile!,
            role: hub.role,
            createdAt: hub.createdAt,
            kycStatus: hub.kycStatus,
            isBlocked: hub.isBlocked
        };
    }
}
