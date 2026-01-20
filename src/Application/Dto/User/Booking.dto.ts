
/**
 * Represents the response structure for user booking validate picode
 */
export interface ValidatePincodeResponseDTO {
  serviceable: boolean;
};


export interface ServiceableHubWithAgencyDTO {

  agency: {
    agencyId: string;
    name: string;
    commissionRate: number;
  };

  fromHub: {
    hubId: string;
    hubName: string;
    address: {
      city: string;
      state: string;
      pincode: string;
    };
    location: {
      lat: number;
      lng: number;
    };
  };

  toHub: {
    hubId: string;
    hubName: string;
    address: {
      city: string;
      state: string;
      pincode: string;
    };
    location: {
      lat: number;
      lng: number;
    };
  };
};


export type AddressResponseDTO = {
  id: string | null;

  label: "Home" | "Office" | "Warehouse" | "Other";

  addressLine1: string;
  addressLine2: string | null;

  city: string;
  state: string;
  country: string;

  pincode: string;

  formattedAddress: string | null;

  location: {
    lat: number;
    lng: number;
  };

  isDefault: boolean;
};



