import { inject, injectable } from "tsyringe";
import { ICreateRouteGroupUseCase } from "../../../interfaces/useCase_Interfaces/Logistics/RouteGroup/ICreateRouteGroupUseCase";
import { IAgencyRouteGroupRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteGroupRepository";
import { CreateRouteGroupRequestDTO } from "../../../Dto/Agency/agencyRouteGroup.dto";
import { AgencyRouteGroupMapper } from "../../../Mappers/Agency/AgencyRouteGroupMapper";
import { AppError } from "../../../../Domain/utils/customError";
import { ROUTE_GROUP_MESSAGE } from "../../../../Infrastructure/constants/messages/RouteGroupMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";

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