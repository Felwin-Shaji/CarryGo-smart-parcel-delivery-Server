import { inject, injectable } from "tsyringe";
import { ICreateAddressFromLocationUseCase } from "../../../interfaces/useCase_Interfaces/user/Address/ICreateAddressFromLocationUseCase";
import { IGeocodingService } from "../../../interfaces/services_Interfaces/IGeocodingService";
import { ReverseGeocodeRawDTO } from "../../../Dto/User/address.dto";
import { IGetHubsUsecase } from "../../../interfaces/useCase_Interfaces/Hub/IGetHubsUsecase";

@injectable()
export class CreateAddressFromLocationUseCase  implements ICreateAddressFromLocationUseCase {
    constructor(
        @inject("IGeocodingService") private geocodingService: IGeocodingService,
        // @inject("IGetHubsUsecase") private getHubsUseCase: IGetHubsUsecase
    ){ };

    async execute(lat: number, lon: number): Promise<ReverseGeocodeRawDTO> {

        const reverseGeocodeAddress = await this.geocodingService.reverseGeocode(lat, lon);
        console.log(reverseGeocodeAddress,'☆*: .｡. o(≧▽≦)o .｡.:*☆☆*: .｡. o(≧▽≦)o .｡.:*☆☆*: .｡. o(≧▽≦)o .｡.:*☆☆*: .｡. o(≧▽≦)o .｡.:*☆☆*: .｡. o(≧▽≦)o .｡.:*☆☆*: .｡. o(≧▽≦)o .｡.:*☆')

        // const hubs = await this.getHubsUseCase.execute();

        return reverseGeocodeAddress;
    }
} 