import { Address } from "../../../Domain/Entities/User/Address";
import { addUserAddressRequestDTO } from "../../Dto/User/address.dto";
import { AddressResponseDTO } from "../../Dto/User/Booking.dto";

export class AddressMapper {
    static toAddressEntity(dto: addUserAddressRequestDTO): Address {
        return new Address(
            null,
            dto.label,
            dto.addressLine1,
            dto.addressLine2 || null,
            dto.city,
            dto.state,
            "CountryPlaceholder", // Assuming country is not provided in DTO
            dto.pincode,
            dto.formattedAddress,
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
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            country: address.country,
            pincode: address.pincode,
            formattedAddress: address.formattedAddress,
            location: {
                lat: address.location.lat,
                lng: address.location.lng,
            },
            isDefault: address.isDefault,
        }));
        
    }
}