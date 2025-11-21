import { Hub } from "../../../../Domain/Entities/Hub/Hub";
import { AddHubDTO } from "../../../Dto/Agency/agency.dto";


export interface IAddHubUseCase {
    execute(dto: AddHubDTO, uploadedFiles: any): Promise<Hub>;
}
