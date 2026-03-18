import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../Domain/utils/customError";
import { IAgencyRouteGroupRepository } from "../../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/IAgencyRouteGroupRepository";
import { IAgencyRouteSegmentRepository } from "../../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { CreateRouteSegmentDTO } from "../../../Dto/Agency/agencyRouteSegment.dto";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { ICreateRouteSegmentUseCase } from "../../../../Application/interfaces/useCase_Interfaces/Agency/RouteGroup/ICreateRouteSegmentUseCase";
import { ROUTE_GROUP_MESSAGE } from "../../../../Infrastructure/constants/messages/RouteGroupMessage";
import { RouteSegmentMapper } from "../../../../Application/Mappers/Agency/RouteSegmentMapper";

@injectable()
export class CreateRouteSegmentUseCase implements ICreateRouteSegmentUseCase {
    constructor(
        @inject("IAgencyRouteGroupRepository") private _routeGroupRepo: IAgencyRouteGroupRepository,

        @inject("IAgencyRouteSegmentRepository") private _segmentRepo: IAgencyRouteSegmentRepository,
    ) { }

    async execute(routeGroupId: string, agencyId: string, data: CreateRouteSegmentDTO): Promise<void> {

        const routeGroup = await this._routeGroupRepo.findById({ _id:routeGroupId });

        if (!routeGroup) {
            throw new AppError(ROUTE_GROUP_MESSAGE.NOTFOUND, STATUS.NOT_FOUND);
        }

        if (routeGroup.agencyId !== agencyId) {
            throw new AppError(ROUTE_GROUP_MESSAGE.ACCESS_DENIED, STATUS.FORBIDDEN);
        }

        const maxOrder = await this._segmentRepo.getMaxOrder(routeGroupId);

        const segment = RouteSegmentMapper.toCreate(routeGroupId, maxOrder, data)

        await this._segmentRepo.save(segment);
    }
}