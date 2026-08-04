import { updateHubKycStatusDTO } from "../../../DTOs/Hub/hub.dto";

export interface IUpdateHubKycStatusUseCase {
    execute(hubId: string, dto: updateHubKycStatusDTO): Promise<void>;
}