import { RouteGroupDetailDTO } from "../../../DTOs/Agency/AgencyRouteSegmentDTO";
import { IAgencyRouteGroupRepository } from "../../../Interfaces/Repositories/Logistics/IAgencyRouteGroupRepository";
import { IAgencyRouteSegmentRepository } from "../../../Interfaces/Repositories/Logistics/IAgencyRouteSegmentRepository";
import { IHubRepository } from "../../../Interfaces/Repositories/Hub/IHubRepository";
import { IGetRouteGroupDetailUseCase } from "../../../Interfaces/UseCases/Logistics/RouteGroup/IGetRouteDetailsUseCase";
import { RouteSegmentMapper } from "../../../Mappers/Agency/RouteSegmentMapper";
import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../Domain/Utils/customError";
import { ROUTE_GROUP_MESSAGE } from "../../../../Infrastructure/Constants/Messages/routeGroupMessages";
import { STATUS } from "../../../../Infrastructure/Constants/statusCodes";

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