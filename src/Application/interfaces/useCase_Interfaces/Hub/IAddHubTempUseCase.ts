import { HubTemp } from "../../../../Domain/Entities/Hub/HubTemp";
import { AddNewHubBaseDto } from "../../../Dto/Agency/agency.dto";

export interface IAddHubTempUseCase{
    execute(dto:AddNewHubBaseDto):Promise<HubTemp>
};