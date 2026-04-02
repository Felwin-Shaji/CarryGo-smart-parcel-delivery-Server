import { WorkerShipmentDetails } from "@/Application/Dto/Logistics/shipment.dto";
import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IGetWorkerShipmentDetailsUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IGetWorkerShipmentDetailsUsecase";
import { AppError } from "@/Domain/utils/customError";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetWorkerShipmentDetailsUsecase implements IGetWorkerShipmentDetailsUsecase {
    constructor(
        @inject("IHubShipmentRepository") private _shipmentRepo: IHubShipmentRepository,
        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,
    ) { }

    async execute(shipmentId: string, page: number, limit: number): Promise<WorkerShipmentDetails> {
        const shipment = await this._shipmentRepo.findById({ _id: shipmentId });
        if (!shipment) throw new AppError(WORKER_MESSAGES.SHIPMENT_NOT_FOUND, STATUS.NOT_FOUND);

        const { parcels, total } = await this._shipmentParcelRepository.findByShipmentIdPaginated(
            shipmentId,
            page,
            limit
        );

        return {
            id: shipment.id!,
            type: shipment.type,
            status: shipment.status,
            parcelCount: total,
            capacity: shipment.capacity,
            createdAt: shipment.createdAt.toString(),
            parcels: parcels
        };

    }
}