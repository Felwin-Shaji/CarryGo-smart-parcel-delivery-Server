import { HubTemp } from "../../../../Domain/Entities/Hub/HubTemp";
import { AddNewHubBaseDto } from "../../../DTOs/Agency/AgencyDTO";

export interface IAddHubTempUseCase{
    execute(dto:AddNewHubBaseDto):Promise<HubTemp>
};