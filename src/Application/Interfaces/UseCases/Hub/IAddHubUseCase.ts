import {  AddNewHubAddressDto, agencyAddHubResponseDTO } from "../../../DTOs/Agency/AgencyDTO";

export interface IAddHubUseCase {
    execute(
        tempHubId: string,
        extraData:AddNewHubAddressDto,
        imageUrl:string
    ): Promise<agencyAddHubResponseDTO>;
}
