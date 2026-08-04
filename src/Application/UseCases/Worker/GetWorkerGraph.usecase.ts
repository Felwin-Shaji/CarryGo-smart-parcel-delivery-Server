import { GetWorkerGraphRequestDTO, GetWorkerGraphResponseDTO } from "../../DTOs/Worker/worker.dto";
import { IShipmentParcelRepository } from "../../Interfaces/Repositories/Logistics/IShipmentParcelRepository";
import { IGetWorkerGraphUseCase } from "../../Interfaces/UseCases/Worker/IGetWorkerGraphUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetWorkerGraphUseCase implements IGetWorkerGraphUseCase {

    constructor(
        @inject("IShipmentParcelRepository") private _parcelRepo: IShipmentParcelRepository
    ) { }

    async execute(workerId: string, filters: GetWorkerGraphRequestDTO): Promise<GetWorkerGraphResponseDTO> {
        const series = await this._parcelRepo.getGraphDataForWorker(
            workerId,
            filters
        );

        return series;
    }
}