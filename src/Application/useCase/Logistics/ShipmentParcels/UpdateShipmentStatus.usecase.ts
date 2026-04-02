import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IBookingRepository } from "@/Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IUpdateShipmentStatusUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IUpdateShipmentStatusUsecase";
import { HubShipmentMapper } from "@/Application/Mappers/Logistics/HubShipmentMapper";
import { ParcelMovementMapper } from "@/Application/Mappers/Logistics/ParcelMovementMapper";
import { ShipmentParcelMapper } from "@/Application/Mappers/Logistics/ShipmentParcelMapper";
import { BookingMapper } from "@/Application/Mappers/User/bookingMapper";
import { ShipmentStatus } from "@/Domain/Entities/Logistics/HubShipment";
import { AppError } from "@/Domain/utils/customError";
import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateShipmentStatusUsecase implements IUpdateShipmentStatusUsecase {
    constructor(
        @inject("IHubShipmentRepository") private _shipmentRepo: IHubShipmentRepository,
        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,
        @inject("IBookingRepository") private _bookingRepository: IBookingRepository
    ) { }

    async execute(shipmentId: string, status: ShipmentStatus): Promise<void> {

        const shipment = await this._shipmentRepo.findById({ _id: shipmentId });
        if (!shipment) throw new AppError("Shipment not found");

        this.validateTransition(shipment.status, status);

        const now = new Date();
        const updatedShipment = HubShipmentMapper.updateStatus(shipment, status, now);
        await this._shipmentRepo.findOneAndUpdate(
            { _id: new Types.ObjectId(shipmentId) },
            {
                status: updatedShipment.status,
                departedAt: updatedShipment.departedAt,
                arrivedAt: updatedShipment.arrivedAt,
                updatedAt: updatedShipment.updatedAt,
            }
        );

        /* ---------------- GET ALL PARCELS ---------------- */
        const parcels = await this._shipmentParcelRepository.findByShipmentId(shipmentId);

        /* ---------------- MAP PARCEL STATUS ---------------- */
        const parcelStatus = ParcelMovementMapper.getStatusFromShipment(status);

        if (parcelStatus) {
            for (const parcel of parcels) {
                const updatedParcel = ShipmentParcelMapper.updateFromShipmentStatus(parcel, status, now);

                await this._shipmentParcelRepository.updateStatus(updatedParcel.id!, updatedParcel.status);
            }
        }

        /* ---------------- UPDATE BOOKINGS ---------------- */
        const bookingStatus = BookingMapper.fromShipmentStatus(status);

        if (bookingStatus) {
            for (const parcel of parcels) {
                await this._bookingRepository.updateStatus(
                    parcel.bookingId,
                    bookingStatus
                );
            }
        }
    }

    /* ---------------- VALIDATION ---------------- */
    private validateTransition(
        current: ShipmentStatus,
        next: ShipmentStatus
    ) {
        const allowedTransitions: Record<ShipmentStatus, ShipmentStatus[]> = {
            PENDING: ["LOADING", "CANCELLED"],
            LOADING: ["DISPATCHED"],
            DISPATCHED: ["ARRIVED"],
            ARRIVED: ["COMPLETED"],
            COMPLETED: [],
            CANCELLED: [],
        };

        if (!allowedTransitions[current].includes(next)) {
            throw new AppError(`Invalid transition: ${current} → ${next}`);
        }
    }

}