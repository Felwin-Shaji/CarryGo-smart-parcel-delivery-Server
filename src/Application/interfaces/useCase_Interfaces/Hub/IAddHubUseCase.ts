import {  AddNewHubAddressDto, agencyAddHubResponseDTO } from "../../../Dto/Agency/agency.dto";

export interface IAddHubUseCase {
    execute(
        tempHubId: string,
        extraData:AddNewHubAddressDto,
        imageUrl:string
    ): Promise<agencyAddHubResponseDTO>;
}
