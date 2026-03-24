import { IParcelRouteLegRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { IHubShipmentAssignmentService } from "@/Application/interfaces/services_Interfaces/IHubShipmentAssignmentService";
import { ICreateHubShipmentsUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ICreateHubShipmentsUsecase";
import { AppError } from "@/Domain/utils/customError";
import { PARCEL_ROUTE_MESSAGE } from "@/Infrastructure/constants/messages/RouteGroupMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateHubShipmentsUsecase implements ICreateHubShipmentsUsecase {
    constructor(
        @inject("IParcelRouteLegRepository") private _parcelRouteLegRepository: IParcelRouteLegRepository,

        @inject("IHubShipmentAssignmentService") private _hubShipmentAssignmentService: IHubShipmentAssignmentService,
    ) { }

    async execute(parcelRouteId: string,bookingId: string): Promise<void> {

        const legs = await this._parcelRouteLegRepository.findByRouteId(parcelRouteId);
        if (!legs.length) throw new AppError(PARCEL_ROUTE_MESSAGE.LEGS_NOTFOUND, STATUS.NOT_FOUND);

        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                for (let leg of legs) {
                    await this._hubShipmentAssignmentService.assignLegToShipment(leg,bookingId, session);
                }
            })

        } finally {
            await session.endSession();
        }
    }

}