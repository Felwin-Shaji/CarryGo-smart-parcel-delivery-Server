  import { ReverseGeocodeRawDTO } from "../../DTOs/User/AddressDTO";


export interface IGeocodingService {
    reverseGeocode(lat: number, lon: number): Promise<ReverseGeocodeRawDTO>;
}
