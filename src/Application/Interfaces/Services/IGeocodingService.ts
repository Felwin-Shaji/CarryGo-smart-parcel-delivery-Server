import { ForwardGeocodeRawDTO, ReverseGeocodeRawDTO } from "../../DTOs/User/AddressDTO";


export interface IGeocodingService {
  reverseGeocode(lat: number, lon: number): Promise<ReverseGeocodeRawDTO>;
  searchAddress(query: string): Promise<ForwardGeocodeRawDTO[]>;
}
