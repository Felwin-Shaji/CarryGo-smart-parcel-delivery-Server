import { updateHubKycStatusDTO } from "../../../DTOs/Hub/HubDTO";

export interface IUpdateHubKycStatusUseCase {
    execute(hubId: string, dto: updateHubKycStatusDTO): Promise<void>;
}