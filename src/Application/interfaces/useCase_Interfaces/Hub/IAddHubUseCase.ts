import { Hub } from "../../../../Domain/Entities/Hub/Hub";
import { AddHubDTO, AddNewHubAddressDto } from "../../../Dto/Agency/agency.dto";

export interface IAddHubUseCase {
    execute(
        tempHubId: string,
        extraData:AddNewHubAddressDto,
        imageUrl:string
    ): Promise<Hub>;
}
