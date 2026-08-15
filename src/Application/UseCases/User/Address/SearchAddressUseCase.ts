import { inject, injectable } from "tsyringe";
import { ForwardGeocodeRawDTO } from "../../../DTOs/User/AddressDTO";
import { IGeocodingService } from "../../../Interfaces/Services/IGeocodingService";
import { ISearchAddressUseCase } from "../../../Interfaces/UseCases/User/Address/ISearchAddressUseCase";

@injectable()
export class SearchAddressUseCase implements ISearchAddressUseCase {

    constructor(
        @inject("IGeocodingService") private geocodingService: IGeocodingService
    ) { }

    async execute(query: string): Promise<ForwardGeocodeRawDTO[]> {

        return this.geocodingService.searchAddress(query);
    }
}