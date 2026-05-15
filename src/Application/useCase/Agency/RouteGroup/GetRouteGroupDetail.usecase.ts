import { RouteGroupDetailDTO } from "../../../Dto/Agency/agencyRouteSegment.dto";
import { IAgencyRouteGroupRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteGroupRepository";
import { IAgencyRouteSegmentRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { IHubRepository } from "../../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { IGetRouteGroupDetailUseCase } from "../../../interfaces/useCase_Interfaces/Logistics/RouteGroup/IGetRouteDetailsUsecase";
import { RouteSegmentMapper } from "../../../Mappers/Agency/RouteSegmentMapper";
import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../Domain/utils/customError";
import { ROUTE_GROUP_MESSAGE } from "../../../../Infrastructure/constants/messages/RouteGroupMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";

@injectable()
export class GetRouteGroupDetailUseCase implements IGetRouteGroupDetailUseCase {
    constructor(
        @inject("IAgencyRouteGroupRepository") private _routeGroupRepo: IAgencyRouteGroupRepository,
        @inject("IAgencyRouteSegmentRepository") private _segmentRepo: IAgencyRouteSegmentRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,
    ) { };

    async execute(routeGroupId: string, agencyId: string): Promise<RouteGroupDetailDTO> {
        console.log(routeGroupId)
        const routeGroup = await this._routeGroupRepo.findById({ _id: routeGroupId });

        if (!routeGroup) {
            throw new AppError(ROUTE_GROUP_MESSAGE.NOTFOUND, STATUS.NOT_FOUND);
        }

        if (routeGroup.agencyId !== agencyId) {
            throw new AppError(ROUTE_GROUP_MESSAGE.ACCESS_DENIED, STATUS.FORBIDDEN);
        }

        const segments = await this._segmentRepo.find({ routeGroupId });

        const seen: Set<string> = new Set();
        segments.forEach(s => {
            seen.add(s.originHubId);
            seen.add(s.destinationHubId);
        });
        const hubIds: string[] = [...seen];

        const hubs = await this._hubRepo.findByIds(hubIds);
        const hubMap = new Map(hubs.map(h => [h.id, { name: h.name, location: h.location }]));

        const segmentDTOs = RouteSegmentMapper.toSegmentDTOs(segments, hubMap);

        const totalDistanceKm = segments.reduce(
            (acc, s) => acc + (s.distanceKm ?? 0), 0
        );

        const totalEstimatedMinutes = segments.reduce(
            (acc, s) => acc + (s.estimatedTimeMinutes ?? 0), 0
        );

        const activeSegmentCount = segments.filter(s => s.isActive).length;

        const respose = RouteSegmentMapper.toRouteGroupDetailDTO(
            routeGroup,
            segmentDTOs,
            totalDistanceKm,
            totalEstimatedMinutes,
            activeSegmentCount
        )

        return respose

    }

}