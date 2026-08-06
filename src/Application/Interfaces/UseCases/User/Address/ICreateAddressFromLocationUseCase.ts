import { ReverseGeocodeRawDTO } from "../../../../DTOs/User/AddressDTO";

export interface ICreateAddressFromLocationUseCase {
    execute(lat: number, lon: number): Promise<ReverseGeocodeRawDTO>;
}