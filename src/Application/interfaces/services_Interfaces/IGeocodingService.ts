  import { ReverseGeocodeRawDTO } from "../../Dto/User/address.dto";


export interface IGeocodingService {
    reverseGeocode(lat: number, lon: number): Promise<ReverseGeocodeRawDTO>;
}
