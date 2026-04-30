import { inject, injectable } from "tsyringe";

import { AppError } from "../../../Domain/utils/customError";
import { IGetWorkerParcelsUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IGetWorkerParcelsUseCase";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { GetWorkerParcelsDTO, GetWorkerParcelsResponseDTO } from "@/Application/Dto/Workers/worker.dto";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { SHIPMENT_PARCEL_MESSAGE } from "@/Infrastructure/constants/messages/RouteGroupMessage";

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