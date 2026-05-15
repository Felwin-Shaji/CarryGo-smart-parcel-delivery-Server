import { IHubShipmentRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IShipmentParcelRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IUpdateShipmentStatusUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IUpdateShipmentStatusUsecase";
import { HubShipmentMapper } from "../../../Mappers/Logistics/HubShipmentMapper";
import { ShipmentStatus } from "../../../../Domain/Entities/Logistics/HubShipment";
import { ShipmentParcel } from "../../../../Domain/Entities/Logistics/ShipmentParcel";
import { AppError } from "../../../../Domain/utils/customError";
import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateShipmentStatusUsecase implements IUpdateShipmentStatusUsecase {
    constructor(
        @inject("IHubShipmentRepository") private _shipmentRepo: IHubShipmentRepository,
        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,
    ) { }

    async execute(shipmentId: string, status: ShipmentStatus): Promise<void> {

        const shipment = await this._shipmentRepo.findById({ _id: shipmentId });
        if (!shipment) throw new AppError("Shipment not found");

        this.validateTransition(shipment.status, status);

        const parcels = await this._shipmentParcelRepository.findByShipmentId(shipmentId);
        this.validateWithParcels(parcels, status);

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

    private validateWithParcels(
        parcels: ShipmentParcel[],
        nextStatus: ShipmentStatus
    ) {
        if (!parcels.length) {
            throw new AppError("No parcels in shipment");
        }

        const all = (status: ShipmentParcel["status"]) =>
            parcels.every(p => p.status === status);

        switch (nextStatus) {

            /* ---------------- LOADING ---------------- */
            case "LOADING":
                // all parcels must still be PENDING at start
                if (!all("PENDING")) {
                    throw new AppError("All parcels must be PENDING to start loading");
                }
                break;

            /* ---------------- DISPATCH ---------------- */
            case "DISPATCHED":
                if (!all("LOADED")) {
                    throw new AppError("All parcels must be LOADED before dispatch");
                }
                break;

            /* ---------------- ARRIVED ---------------- */
            case "ARRIVED":
                if (!all("IN_TRANSIT")) {
                    throw new AppError("All parcels must be IN_TRANSIT before arrival");
                }
                break;

            /* ---------------- COMPLETED ---------------- */
            case "COMPLETED":
                if (!all("UNLOADED")) {
                    throw new AppError("All parcels must be UNLOADED before completion");
                }
                break;

            /* ---------------- CANCELLED ---------------- */
            case "CANCELLED":
                // optional: allow cancel anytime OR restrict
                return;

            default:
                return;
        }
    }
}