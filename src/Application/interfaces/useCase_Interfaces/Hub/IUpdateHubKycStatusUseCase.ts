import { updateHubKycStatusDTO } from "../../../Dto/Hub/hub.dto";

export interface IUpdateHubKycStatusUseCase {
    execute(hubId: string, dto: updateHubKycStatusDTO): Promise<void>;
}