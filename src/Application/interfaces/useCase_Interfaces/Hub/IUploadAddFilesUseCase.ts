import { AddHubDTO } from "../../../Dto/Agency/agency.dto";

export interface IUploadAddFilesUseCase {
    execute(dto: AddHubDTO): Promise< string >;
}


///////////////////////////