import axios from "axios";
import { ReverseGeocodeRawDTO } from "../../../Application/Dto/User/address.dto";
import { IGeocodingService } from "../../../Application/interfaces/services_Interfaces/IGeocodingService";

export class GeocodingService implements IGeocodingService {

    async reverseGeocode(lat: number, lon: number): Promise<ReverseGeocodeRawDTO> {
        const res = await axios.get("https://geocode.maps.co/reverse", {
            params: {
                lat,
                lon,
                api_key: process.env.GEOCODING_SECRET_API_KEY,
            },
        });

        const a = res.data.address;

        console.log(a);

        return {
            addressLine1: `${a.house_number ?? ""} ${a.road ?? ""}`.trim(),
            city: a.city || a.town || a.village || "",
            state: a.state || "",
            country: a.country || "India",
            pincode: a.postcode || "",
            formattedAddress: res.data.display_name || null,
            lat,
            lng: lon,
        };
    };
};