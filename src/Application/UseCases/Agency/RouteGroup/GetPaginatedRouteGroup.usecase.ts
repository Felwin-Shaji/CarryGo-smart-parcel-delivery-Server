import { inject, injectable } from "tsyringe";
import { RouteGroupPaginationRequestDTO, PaginatedRouteGroupResponseDTO } from "../../../DTOs/Agency/AgencyRouteGroupDTO";
import { IGetPaginatedRouteGroupUseCase } from "../../../Interfaces/UseCases/Logistics/RouteGroup/IGetPaginatedRouteGroupUseCase";
import { IAgencyRouteGroupRepository } from "../../../Interfaces/Repositories/Logistics/IAgencyRouteGroupRepository";

@injectable()
export class GetPaginatedRouteGroupUseCase implements IGetPaginatedRouteGroupUseCase {
    constructor(
        @inject("IAgencyRouteGroupRepository") private _agencyRouteGroupRepository: IAgencyRouteGroupRepository
    ) { };


    async execute(
        agencyId: string,
        options: RouteGroupPaginationRequestDTO
    ): Promise<PaginatedRouteGroupResponseDTO> {

        const safePage = Math.max(1, options.page);
        const safeLimit = Math.min(Math.max(1, options.limit), 100);
        const paginationOptions: RouteGroupPaginationRequestDTO = {
            page: safePage,
            limit: safeLimit,
            ...(options.filters && { filters: options.filters }),
        };

        const { data, total } = await this._agencyRouteGroupRepository.getPaginated(
            agencyId,
            paginationOptions
        );

        console.log(data, 'ssssssssssssss')

        return {
            data,
            total,
            page: safePage,
            limit: safeLimit,
            totalPages: Math.ceil(total / safeLimit),
        };
    }
}
