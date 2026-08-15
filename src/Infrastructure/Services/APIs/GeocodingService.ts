import axios from "axios";
import { ForwardGeocodeRawDTO, ReverseGeocodeRawDTO } from "../../../Application/DTOs/User/AddressDTO";
import { IGeocodingService } from "../../../Application/Interfaces/Services/IGeocodingService";
import { GeocodeSearchResponse } from "../../Types/GeocodeSearchResponse";

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

    async searchAddress(query: string): Promise<ForwardGeocodeRawDTO[]> {

        const res = await axios.get<GeocodeSearchResponse[]>(
            "https://geocode.maps.co/search",
            {
                params: {
                    q: query,
                    api_key: process.env.GEOCODING_SECRET_API_KEY,
                    format: "jsonv2",
                    addressdetails: 1,
                    limit: 5,
                    countrycodes: "in",
                },
            }
        );

        return res.data.map((item) => ({
            addressLine1:
                `${item.address?.house_number ?? ""} ${item.address?.road ?? ""}`.trim(),

            city:
                item.address?.city ||
                item.address?.town ||
                item.address?.village ||
                "",

            state: item.address?.state || "",

            country: item.address?.country || "India",

            pincode: item.address?.postcode || "",

            formattedAddress: item.display_name || "",

            lat: Number(item.lat),

            lng: Number(item.lon),
        }));
    }
};