import { inject, injectable } from "tsyringe";
import { ICreateAddressFromLocationUseCase } from "../../../Interfaces/UseCases/User/Address/ICreateAddressFromLocationUseCase";
import { IGeocodingService } from "../../../Interfaces/Services/IGeocodingService";
import { ReverseGeocodeRawDTO } from "../../../DTOs/User/address.dto";

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