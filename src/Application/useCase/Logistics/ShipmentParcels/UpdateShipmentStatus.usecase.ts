import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IUpdateShipmentStatusUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IUpdateShipmentStatusUsecase";
import { HubShipmentMapper } from "@/Application/Mappers/Logistics/HubShipmentMapper";
import { ShipmentStatus } from "@/Domain/Entities/Logistics/HubShipment";
import { ShipmentParcel } from "@/Domain/Entities/Logistics/ShipmentParcel";
import { AppError } from "@/Domain/utils/customError";
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

        switch (nextStatus) {

            case "LOADING":
                return;

            case "DISPATCHED":
                if (!parcels.every(p => p.status === "LOADED")) {
                    throw new AppError("All parcels must be LOADED before dispatch");
                }
                break;

            case "ARRIVED":
                if (!parcels.every(p => p.status === "IN_TRANSIT")) {
                    throw new AppError("All parcels must be IN_TRANSIT before arrival");
                }
                break;

            case "COMPLETED":
                if (!parcels.every(p => p.status === "UNLOADED")) {
                    throw new AppError("All parcels must be UNLOADED before completion");
                }
                break;

            case "CANCELLED":
                return;

            default:
                return;
        }
    }

}