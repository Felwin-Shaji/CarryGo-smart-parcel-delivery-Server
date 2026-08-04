  import { ReverseGeocodeRawDTO } from "../../DTOs/User/address.dto";


export interface IGeocodingService {
    reverseGeocode(lat: number, lon: number): Promise<ReverseGeocodeRawDTO>;
}
