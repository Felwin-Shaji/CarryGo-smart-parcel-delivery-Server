import { RouteGroupDetailDTO } from "@/Application/Dto/Agency/agencyRouteSegment.dto";
import { IAgencyRouteGroupRepository } from "@/Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/IAgencyRouteGroupRepository";
import { IAgencyRouteSegmentRepository } from "@/Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { IHubRepository } from "@/Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { IGetRouteGroupDetailUseCase } from "@/Application/interfaces/useCase_Interfaces/Agency/RouteGroup/IGetRouteDetailsUsecase";
import { RouteSegmentMapper } from "@/Application/Mappers/Agency/RouteSegmentMapper";
import { AppError } from "@/Domain/utils/customError";
import { ROUTE_GROUP_MESSAGE } from "@/Infrastructure/constants/messages/RouteGroupMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { injectable, inject } from "tsyringe";

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
        console.log(routeGroup, 'lllllllllllll')

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