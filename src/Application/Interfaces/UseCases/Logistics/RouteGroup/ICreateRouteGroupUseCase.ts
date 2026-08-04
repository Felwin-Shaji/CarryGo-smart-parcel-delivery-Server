import { CreateRouteGroupRequestDTO } from "../../../../DTOs/Agency/AgencyRouteGroupDTO";

export interface ICreateRouteGroupUseCase {
    execute(agencyId: string, data: CreateRouteGroupRequestDTO): Promise<void>
}