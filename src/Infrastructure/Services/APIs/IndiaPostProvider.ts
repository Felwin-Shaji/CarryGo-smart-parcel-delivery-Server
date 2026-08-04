import { injectable } from "tsyringe";
import { IPincodeLookupService } from "../../../Application/Interfaces/Services/IPincodeLookupService";
import { PincodeDetails } from "../../Types/types";
import axios from "axios";
import { AppError } from "../../../Domain/Utils/customError";
import { SERVICE_MESSAGES } from "../../Constants/Messages/servicesMessaeg";
import { STATUS } from "../../Constants/statusCodes";

@injectable()
export class PincodeLookupService implements IPincodeLookupService {
    async getPincodeDetails(pincode: string): Promise<PincodeDetails> {
        const response = await axios.get(
            `https://api.postalpincode.in/pincode/${pincode}`
        );

        const data = response.data?.[0];

        if (data?.Status !== "Success") throw new AppError(SERVICE_MESSAGES.INVALID_PINCODE, STATUS.BAD_REQUEST);

        const postOffice = data.PostOffice[0];
        console.log(postOffice);

        return {
            pincode,
            city: postOffice.Block,
            district: postOffice.District,
            state: postOffice.State,
        };

    }
} 