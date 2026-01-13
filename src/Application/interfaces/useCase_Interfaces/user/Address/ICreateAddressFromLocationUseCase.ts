import { ReverseGeocodeRawDTO } from "../../../../Dto/User/address.dto";

export interface ICreateAddressFromLocationUseCase {
    execute(lat: number, lon: number): Promise<ReverseGeocodeRawDTO>;
}