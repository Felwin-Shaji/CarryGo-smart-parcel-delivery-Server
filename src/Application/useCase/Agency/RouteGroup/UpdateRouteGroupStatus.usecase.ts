import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../Domain/utils/customError";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { ROUTE_GROUP_MESSAGE } from "../../../../Infrastructure/constants/messages/RouteGroupMessage";
import { IAgencyRouteGroupRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteGroupRepository";
import { IUpdateRouteGroupStatusUseCase } from "../../../interfaces/useCase_Interfaces/Logistics/RouteGroup/IUpdateRouteGroupStatusUseCase";

@injectable()
export class UpdateRouteGroupStatusUseCase implements IUpdateRouteGroupStatusUseCase {
    constructor(
        @inject("IAgencyRouteGroupRepository") private _routeGroupRepo: IAgencyRouteGroupRepository
    ) { };

    async execute(routeGroupId: string, agencyId: string, isActive: boolean): Promise<void> {

        const routeGroup = await this._routeGroupRepo.findById({ _id: routeGroupId });

        if (!routeGroup) throw new AppError(ROUTE_GROUP_MESSAGE.NOTFOUND, STATUS.NOT_FOUND);
        if (routeGroup.agencyId !== agencyId) throw new AppError(ROUTE_GROUP_MESSAGE.ACCESS_DENIED, STATUS.FORBIDDEN);

        if (routeGroup.isActive === isActive) {
            throw new AppError(
                isActive
                    ? ROUTE_GROUP_MESSAGE.ALREADY_ACTIVE
                    : ROUTE_GROUP_MESSAGE.ALREADY_INACTIVE,
                STATUS.BAD_REQUEST
            );
        }

        await this._routeGroupRepo.findOneAndUpdate(
            { _id: routeGroupId },
            { isActive }
        );
    };
}