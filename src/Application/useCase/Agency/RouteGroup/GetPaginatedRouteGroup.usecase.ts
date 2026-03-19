import { inject, injectable } from "tsyringe";
import { RouteGroupPaginationRequestDTO, PaginatedRouteGroupResponseDTO } from "../../../Dto/Agency/agencyRouteGroup.dto";
import { IGetPaginatedRouteGroupUseCase } from "../../../interfaces/useCase_Interfaces/Logistics/RouteGroup/IGetPaginatedRouteGroupUseCase";
import { IAgencyRouteGroupRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteGroupRepository";

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
