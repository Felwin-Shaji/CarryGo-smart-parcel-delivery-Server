import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IParcelRouteLegRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { IParcelRouteRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IBookingRepository } from "@/Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IBulkUpdateShipmentParcelUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IBulkUpdateShipmentParcelUsecase";
import { ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";
import { AppError } from "@/Domain/utils/customError";
import { SHIPMENT_PARCEL_MESSAGE } from "@/Infrastructure/constants/messages/RouteGroupMessage";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { BookingStatusType } from "@/Infrastructure/Types/types";
import { inject, injectable } from "tsyringe";

const PARCEL_FLOW: Record<ShipmentParcelStatus, ShipmentParcelStatus> = {
    PENDING: "LOADED",
    LOADED: "IN_TRANSIT",
    IN_TRANSIT: "UNLOADED",
    UNLOADED: "UNLOADED",
};

@injectable()
export class BulkUpdateShipmentParcelUsecase implements IBulkUpdateShipmentParcelUsecase {
    constructor(
        @inject("IShipmentParcelRepository") private _shipmentParcelRepo: IShipmentParcelRepository,
        @inject("IHubShipmentRepository") private _hubShipmentRepo: IHubShipmentRepository,
        @inject("IParcelRouteRepository") private _routeRepo: IParcelRouteRepository,
        @inject("IParcelRouteLegRepository") private _routeLegRepo: IParcelRouteLegRepository,
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
    ) { };

    async execute(shipmentId: string, parcelIds: string[], status: ShipmentParcelStatus): Promise<void> {

        const shipment = await this._hubShipmentRepo.findById({ _id: shipmentId });
        if (!shipment) throw new AppError(WORKER_MESSAGES.SHIPMENT_NOT_FOUND, STATUS.NOT_FOUND);

        const parcels = await this._shipmentParcelRepo.findByIds(parcelIds);
        if (!parcels.length) throw new AppError(SHIPMENT_PARCEL_MESSAGE.NOTFOUND, STATUS.NOT_FOUND);

        const invalidParcels = parcels.filter(p => p.shipmentId !== shipmentId);

        if (invalidParcels.length > 0) {
            throw new AppError(SHIPMENT_PARCEL_MESSAGE.INVALID_PARCELS, STATUS.BAD_REQUEST);
        }

        const invalidFlow = parcels.filter(p => {
            const allowedNext = PARCEL_FLOW[p.status];
            return allowedNext !== status;
        });

        if (invalidFlow.length > 0) throw new AppError(SHIPMENT_PARCEL_MESSAGE.INVALID_FLOW, STATUS.BAD_REQUEST);


        /* ---------------- BULK UPDATE ---------------- */
        await this._shipmentParcelRepo.bulkUpdateStatus(parcelIds, status);

        for (const parcel of parcels) {

            /* -------- UPDATE BOOKING -------- */
            let bookingStatus: BookingStatusType | null = null;

            if (status === "LOADED") bookingStatus = "PICKUP_STARTED";
            

            if (status === "IN_TRANSIT") bookingStatus = "IN_TRANSIT";
            

            if (status === "UNLOADED") {

                if (shipment.type === "OUT_FOR_DELIVERY") bookingStatus = "DELIVERED";
                else if (shipment.type === "HUB_TRANSFER") bookingStatus = "IN_TRANSIT";
                else if (shipment.type === "BULK_PICKUP") bookingStatus = "IN_TRANSIT";
                
            }

            if (bookingStatus) {
                await this._bookingRepo.updateStatus(parcel.bookingId, bookingStatus);
            }
            

            /* -------- UPDATE LEG & ROUTE -------- */

            if (shipment.type !== "HUB_TRANSFER") return;

            const route = await this._routeRepo.findByBookingId(parcel.bookingId);
            if (!route) continue;

            const legs = await this._routeLegRepo.findByRouteId(route.id!);
            const sortedLegs = legs.sort((a, b) => a.legOrder - b.legOrder);

            const currentLeg = sortedLegs.find(l => l.status === "IN_PROGRESS" || l.status === "PENDING");

            if (!currentLeg) continue;

            /* -------- UPDATE LEG -------- */
            if (status === "LOADED") {
                currentLeg.status = "IN_PROGRESS";
                currentLeg.shipmentId = shipmentId;
            };

            if (status === "UNLOADED") {
                currentLeg.status = "COMPLETED";

                const nextLeg = sortedLegs.find(l => l.legOrder === currentLeg.legOrder + 1);

                if (nextLeg) {
                    nextLeg.status = "PENDING";
                    await this._routeLegRepo.update(nextLeg);
                }
            }


            /* -------- UPDATE ROUTE -------- */
            const allCompleted = sortedLegs.every(l => l.status === "COMPLETED");
            const anyInProgress = sortedLegs.some(l => l.status === "IN_PROGRESS");

            if (allCompleted) {
                route.status = "COMPLETED";
            } else if (anyInProgress) {
                route.status = "IN_PROGRESS";
            }

            route.updatedAt = new Date();
            await this._routeRepo.update(route);
        }
    }
}