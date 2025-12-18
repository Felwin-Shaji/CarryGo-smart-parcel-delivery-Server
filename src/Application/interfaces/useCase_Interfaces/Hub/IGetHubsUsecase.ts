import { Hub } from "../../../../Domain/Entities/Hub/Hub";
import { GetHubsDTO, GetHubsResponseDTO } from "../../../Dto/Hub/hub.dto";

export interface IGetHubsUsecase {
    execute(dto: GetHubsDTO): Promise<GetHubsResponseDTO>;
}