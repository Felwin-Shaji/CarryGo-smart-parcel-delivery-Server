import { Types } from "mongoose";
import { Hub } from "../../Domain/Entities/Hub/Hub";
import { HubTemp } from "../../Domain/Entities/Hub/HubTemp";
import { AddNewHubBaseDto, agencyAddHubResponseDTO } from "../Dto/Agency/agency.dto";

export class HubTempMapper {
    static toHubTemp(dto: AddNewHubBaseDto, hashOtp: string): HubTemp {

        const expiresAt = new Date(Date.now() + 1000 * 60 * 2);

        return {
            _id: null,
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
            0,
            false,
            new Date(),
            new Date()
        );
    }

    static toAgencyAddHubResponseDTO(hub: Hub):agencyAddHubResponseDTO {
        return {
            id: hub._id!,
            name: hub.name,
            email: hub.email,
            role: hub.role,
            kycStatus: hub.kycStatus,
        };
    }
}
