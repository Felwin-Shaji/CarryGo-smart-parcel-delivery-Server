import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { IGetWorkerParcelsUseCase } from "../../Interfaces/UseCases/Worker/IGetWorkerParcelsUseCase";
import { IShipmentParcelRepository } from "../../Interfaces/Repositories/Logistics/IShipmentParcelRepository";
import { GetWorkerParcelsDTO, GetWorkerParcelsResponseDTO } from "../../DTOs/Worker/WorkerDTO";
import { WORKER_MESSAGES } from "../../../Infrastructure/Constants/Messages/workerMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { SHIPMENT_PARCEL_MESSAGE } from "../../../Infrastructure/Constants/Messages/routeGroupMessages";

@injectable()
export class GetWorkerParcelsUseCase implements IGetWorkerParcelsUseCase {

    constructor(
        @inject("IShipmentParcelRepository") private _parcelRepo: IShipmentParcelRepository
    ) { }

    async execute(workerId: string, dto: GetWorkerParcelsDTO): Promise<GetWorkerParcelsResponseDTO> {

        if (!workerId) throw new AppError(WORKER_MESSAGES.WORKERS_NOT_FOUND, STATUS.NOT_FOUND);

        if (dto.page < 1 || dto.limit < 1) {
            throw new AppError(SHIPMENT_PARCEL_MESSAGE.INVALID_PAGINATION_VALUES, STATUS.BAD_REQUEST);
        }

        const result = await this._parcelRepo.getWorkerParcels(workerId, dto);

        return result;
    }
}