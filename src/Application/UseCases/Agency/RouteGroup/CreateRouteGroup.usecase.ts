import { inject, injectable } from "tsyringe";
import { ICreateRouteGroupUseCase } from "../../../Interfaces/UseCases/Logistics/RouteGroup/ICreateRouteGroupUseCase";
import { IAgencyRouteGroupRepository } from "../../../Interfaces/Repositories/Logistics/IAgencyRouteGroupRepository";
import { CreateRouteGroupRequestDTO } from "../../../DTOs/Agency/agencyRouteGroup.dto";
import { AgencyRouteGroupMapper } from "../../../Mappers/Agency/AgencyRouteGroupMapper";
import { AppError } from "../../../../Domain/Utils/customError";
import { ROUTE_GROUP_MESSAGE } from "../../../../Infrastructure/Constants/Messages/RouteGroupMessage";
import { STATUS } from "../../../../Infrastructure/Constants/statusCodes";

@injectable()
export class CreateRouteGroupUseCase implements ICreateRouteGroupUseCase {
    constructor(
        @inject("IAgencyRouteGroupRepository") private _agencyRouteGroupRepository: IAgencyRouteGroupRepository
    ) { };

    async execute(agencyId: string, data: CreateRouteGroupRequestDTO): Promise<void> {

        const existing = await this._agencyRouteGroupRepository.findOne({ agencyId, name: data.name.trim() });

        if (existing) throw new AppError(ROUTE_GROUP_MESSAGE.ROUTE_GROUP_EXIST, STATUS.BAD_REQUEST)

        const routeGroup = AgencyRouteGroupMapper.toCreate(agencyId, data);

        await this._agencyRouteGroupRepository.save(routeGroup);


    }
}