import { CreateRouteGroupRequestDTO } from "../../../../Dto/Agency/agencyRouteGroup.dto";

export interface ICreateRouteGroupUseCase {
    execute(agencyId: string, data: CreateRouteGroupRequestDTO): Promise<void>
}