// Application/interfaces/useCase_Interfaces/Agency/RouteGroup/IGetPaginatedRouteGroupUseCase.ts

import { PaginatedRouteGroupResponseDTO, RouteGroupPaginationRequestDTO } from "../../../../DTOs/Agency/agencyRouteGroup.dto";

export interface IGetPaginatedRouteGroupUseCase {
    execute(
        agencyId: string,
        options: RouteGroupPaginationRequestDTO
    ): Promise<PaginatedRouteGroupResponseDTO>;
}