import {  AddNewHubAddressDto, agencyAddHubResponseDTO } from "../../../DTOs/Agency/agency.dto";

export interface IAddHubUseCase {
    execute(
        tempHubId: string,
        extraData:AddNewHubAddressDto,
        imageUrl:string
    ): Promise<agencyAddHubResponseDTO>;
}
