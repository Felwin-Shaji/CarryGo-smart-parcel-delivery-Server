import { inject, injectable } from "tsyringe";
import { ICreateAddressFromLocationUseCase } from "../../../interfaces/useCase_Interfaces/user/Address/ICreateAddressFromLocationUseCase";
import { IGeocodingService } from "../../../interfaces/services_Interfaces/IGeocodingService";
import { ReverseGeocodeRawDTO } from "../../../Dto/User/address.dto";

@injectable()
export class CreateAddressFromLocationUseCase  implements ICreateAddressFromLocationUseCase {
    constructor(
        @inject("IGeocodingService") private geocodingService: IGeocodingService,

    ){ };

    async execute(lat: number, lon: number): Promise<ReverseGeocodeRawDTO> {

        const reverseGeocodeAddress = await this.geocodingService.reverseGeocode(lat, lon);

        return reverseGeocodeAddress;
    }
} 