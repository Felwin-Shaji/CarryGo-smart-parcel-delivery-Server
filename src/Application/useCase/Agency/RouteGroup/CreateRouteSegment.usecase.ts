import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../Domain/utils/customError";
import { IAgencyRouteGroupRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteGroupRepository";
import { IAgencyRouteSegmentRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { CreateRouteSegmentDTO } from "../../../Dto/Agency/agencyRouteSegment.dto";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { ICreateRouteSegmentUseCase } from "../../../interfaces/useCase_Interfaces/Logistics/RouteGroup/ICreateRouteSegmentUseCase";
import { ROUTE_GROUP_MESSAGE, ROUTE_SEGMENT_MESSAGE } from "../../../../Infrastructure/constants/messages/RouteGroupMessage";
import { RouteSegmentMapper } from "../../../../Application/Mappers/Agency/RouteSegmentMapper";

@injectable()
export class CreateRouteSegmentUseCase implements ICreateRouteSegmentUseCase {
    constructor(
        @inject("IAgencyRouteGroupRepository") private _routeGroupRepo: IAgencyRouteGroupRepository,

        @inject("IAgencyRouteSegmentRepository") private _segmentRepo: IAgencyRouteSegmentRepository,
    ) { }

    async execute(routeGroupId: string, agencyId: string, data: CreateRouteSegmentDTO): Promise<void> {

        const routeGroup = await this._routeGroupRepo.findById({ _id: routeGroupId });

        if (!routeGroup) {
            throw new AppError(ROUTE_GROUP_MESSAGE.NOTFOUND, STATUS.NOT_FOUND);
        }

        if (routeGroup.agencyId !== agencyId) {
            throw new AppError(ROUTE_GROUP_MESSAGE.ACCESS_DENIED, STATUS.FORBIDDEN);
        }

        if (data.originHubId === data.destinationHubId) {
            throw new AppError(ROUTE_SEGMENT_MESSAGE.INVALID_HUB_CHAIN, STATUS.BAD_REQUEST);
        };

        const alreadyExists = await this._segmentRepo.existsSegment(routeGroupId, data.originHubId, data.destinationHubId);

        if (alreadyExists) {
            throw new AppError(ROUTE_SEGMENT_MESSAGE.SEGMENT_ALREADY_EXISTS, STATUS.CONFLICT);
        }

        const lastSegment = await this._segmentRepo.findLastSegment(routeGroupId);

        if (lastSegment && lastSegment.destinationHubId !== data.originHubId) {
            throw new AppError(
                ROUTE_SEGMENT_MESSAGE.INVALID_CHAIN,
                STATUS.BAD_REQUEST
            );
        }

        const maxOrder = await this._segmentRepo.getMaxOrder(routeGroupId);
        const segment = RouteSegmentMapper.toCreate(agencyId, routeGroupId, maxOrder, data)

        await this._segmentRepo.save(segment);
    }
}