
/**
 * Represents the response structure for user booking validate picode
 */
export interface ValidatePincodeResponseDTO {
  serviceable: boolean;
  from: {
    pincode: string;
    city: string;
    district: string;
    state: string;
  };
  to: {
    pincode: string;
    city: string;
    district: string;
    state: string;
  };
}
