import { Address } from "../../../Domain/Entities/User/Address";
import { addUserAddressRequestDTO } from "../../Dto/User/address.dto";
import { AddressResponseDTO } from "../../Dto/User/Booking.dto";

export class AddressMapper {
    static toAddressEntity(dto: addUserAddressRequestDTO): Address {
        return new Address(
            null,
            dto.label,
            dto.formattedAddress,        
            dto.city,
            dto.state,
            dto.country || "india", // Assuming country is not provided in DTO
            dto.pincode,
            {
                lat: dto.location.lat,
                lng: dto.location.lng
            }

        );
    }

    static toAddressResponseDTO(addresses: Address[]): AddressResponseDTO[] {

        return addresses.map((address) => ({
            id: address.id,
            label: address.label,
            formattedAddress: address.formattedAddress,
            city: address.city,
            state: address.state,
            country: address.country,
            pincode: address.pincode,
            location: {
                lat: address.location.lat,
                lng: address.location.lng,
            },
            isDefault: address.isDefault,
        }));
        
    }
}