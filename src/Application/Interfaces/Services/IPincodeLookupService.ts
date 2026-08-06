import { PincodeDetails } from "../../../Infrastructure/Types/CommonTypes";

export interface IPincodeLookupService {
  getPincodeDetails(pincode: string): Promise<PincodeDetails>;
}
