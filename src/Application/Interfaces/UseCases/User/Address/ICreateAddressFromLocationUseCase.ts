import { ReverseGeocodeRawDTO } from "../../../../DTOs/User/address.dto";

export interface ICreateAddressFromLocationUseCase {
    execute(lat: number, lon: number): Promise<ReverseGeocodeRawDTO>;
}