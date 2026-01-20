import { Types } from "mongoose";
import { Hub } from "../../../Domain/Entities/Hub/Hub";
import { HubTemp } from "../../../Domain/Entities/Hub/HubTemp";
import { AddNewHubBaseDto, agencyAddHubResponseDTO } from "../../Dto/Agency/agency.dto";
import { HubOverviewResponseDTO } from "../../Dto/Hub/hubOverview.dto";

export class HubTempMapper {
    static toHubTemp(dto: AddNewHubBaseDto, hashOtp: string): HubTemp {

        const expiresAt = new Date(Date.now() + 1000 * 60 * 2);

        return {
            id: null,
            agencyId: dto.agencyId,
            name: dto.name,
            email: dto.email,
            mobile: dto.mobile,
            otp: hashOtp,
            role: "hub",
            addressLine1: null,
            city: null,
            state: null,
            pincode: null,
            location_lat: null,
            location_lng: null,
            status: "BASIC-Info",
            expiresAt,
        };
    }


}


export class HubMapper {
    static toCreateHub(
        tempHub: HubTemp,
        hashedPassword: string,
        imageUrl: string
    ): Hub {

        return new Hub(
            null,
            new Types.ObjectId(tempHub.agencyId),
            tempHub.name,
            tempHub.email,
            tempHub.mobile,
            hashedPassword,
            "hub",
            {
                addressLine1: tempHub.addressLine1!,
                city: tempHub.city!,
                state: tempHub.state!,
                pincode: tempHub.pincode!,
            },
            {
                lat: tempHub.location_lat!,
                lng: tempHub.location_lng!,
            },
            imageUrl,
            "PENDING",
            null,
            0,
            false,
            new Date(),
            new Date()
        );
    }

    static toAgencyAddHubResponseDTO(hub: Hub): agencyAddHubResponseDTO {
        return {
            id: hub.id!,
            name: hub.name,
            email: hub.email,
            role: hub.role,
            kycStatus: hub.kycStatus,
        };
    }

    static toHubOverviewResponseDTO(hub: Hub): HubOverviewResponseDTO {
        return {
            id: hub.id!,
            agencyId: hub.agencyId.toString(),
            name: hub.name,
            email: hub.email,
            mobile: hub.mobile,
            role: "hub",
            address: {
                addressLine1: hub.address.addressLine1,
                city: hub.address.city,
                state: hub.address.state,
                pincode: hub.address.pincode
            },
            location: {
                lat: hub.location.lat,
                lng: hub.location.lng
            },
            verificationImage: hub.verificationImage,
            kycStatus: hub.kycStatus,
            walletBalance: hub.walletBalance,
            isBlocked: hub.isBlocked,
            createdAt: hub.createdAt
        }
    }
}
