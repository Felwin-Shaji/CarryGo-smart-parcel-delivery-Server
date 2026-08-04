import { HubTemp } from "../../../../Domain/Entities/Hub/HubTemp";
import { AddNewHubBaseDto } from "../../../DTOs/Agency/agency.dto";

export interface IAddHubTempUseCase{
    execute(dto:AddNewHubBaseDto):Promise<HubTemp>
};