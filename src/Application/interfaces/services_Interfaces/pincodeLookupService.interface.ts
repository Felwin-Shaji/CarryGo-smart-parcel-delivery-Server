import { PincodeDetails } from "../../../Infrastructure/Types/types";

export interface IPincodeLookupService {
  getPincodeDetails(pincode: string): Promise<PincodeDetails>;
}
