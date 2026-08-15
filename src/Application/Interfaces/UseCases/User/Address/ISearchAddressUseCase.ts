import { ForwardGeocodeRawDTO } from "../../../../DTOs/User/AddressDTO";

export interface ISearchAddressUseCase {
    execute(query: string): Promise<ForwardGeocodeRawDTO[]>;
}