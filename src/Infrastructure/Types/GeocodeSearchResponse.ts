export interface GeocodeSearchAddress {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
    postcode?: string;
}

export interface GeocodeSearchResponse {
    lat: string;
    lon: string;
    display_name: string;
    address?: GeocodeSearchAddress;
}