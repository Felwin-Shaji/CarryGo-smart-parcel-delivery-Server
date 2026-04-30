import { GetWorkerGraphRequestDTO, GetWorkerGraphResponseDTO } from "@/Application/Dto/Workers/worker.dto";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IGetWorkerGraphUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IGetWorkerGraphUseCase";
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