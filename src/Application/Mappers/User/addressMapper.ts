import { Address } from "../../../Domain/Entities/User/Address";
import { addUserAddressRequestDTO } from "../../Dto/User/address.dto";

export class AddressMapper {
    static toAddressEntity(dto: addUserAddressRequestDTO) : Address {
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
}