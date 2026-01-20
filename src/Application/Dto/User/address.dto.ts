export interface ReverseGeocodeRawDTO {
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  formattedAddress: string;
  lat: number;
  lng: number;
};


export interface addUserAddressRequestDTO {
  id: string;
  label: "Home" | "Office" | "Warehouse" | "Other";
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  formattedAddress: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface AddressByPincodeREsponseDTO {
  id: string | null;
  label: "Home" | "Office" | "Warehouse" | "Other";
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  country: string;
  pincode: string;
  formattedAddress?: string | null;
  location: {
    lat: number;
    lng: number;
  };
  isDefault?: boolean;
  isActive?: boolean;
}

