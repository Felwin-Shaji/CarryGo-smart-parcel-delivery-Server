import { GetWorkerDashboardResponseDTO } from "@/Application/Dto/Workers/worker.dto";
import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IHubWorkerRepository } from "@/Application/interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IGetWorkerDashboardUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IGetWorkerDashboardUseCase";
import { WorkerDashboardMapper } from "@/Application/Mappers/Workers/WorkerDashboardMapper";
import { AppError } from "@/Domain/utils/customError";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetWorkerDashboardUseCase implements IGetWorkerDashboardUseCase {

    constructor(
        @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,
        @inject("IHubShipmentRepository") private _shipmentRepo: IHubShipmentRepository,
        @inject("IShipmentParcelRepository") private _shipmentParcelRepo: IShipmentParcelRepository
    ) { }

    async execute(workerId: string): Promise<GetWorkerDashboardResponseDTO> {

        // Worker
        const worker = await this._workerRepo.findById({ _id: workerId });
        if (!worker) throw new AppError(WORKER_MESSAGES.WORKERS_NOT_FOUND, STATUS.NOT_FOUND);

        // Active Shipment
        const activeShipment = await this._shipmentRepo.findActiveByWorker(workerId);

        //  Dates
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        //  Parallel stats
        const [
            completedShipments,
            completedParcels,
            todayShipments,
            todayParcels,
            pendingParcels,
        ] = await Promise.all([
            this._shipmentRepo.countCompleted(workerId),
            this._shipmentParcelRepo.countByStatusForWorker(workerId, "UNLOADED"),
            this._shipmentRepo.countToday(workerId, todayStart),
            this._shipmentParcelRepo.countTodayForWorker(workerId, todayStart),
            this._shipmentParcelRepo.countPendingForWorker(workerId),
        ]);


        const totalParcels = completedParcels + pendingParcels;

        const completionRate =
            totalParcels === 0
                ? 0
                : Math.round((completedParcels / totalParcels) * 100);

        let activeShipmentParcelCount = 0;

        if (activeShipment) {
            activeShipmentParcelCount =
                await this._shipmentParcelRepo.countByShipment(activeShipment.id!);
        }

        return WorkerDashboardMapper.toResponse({
            worker,
            activeShipment,
            completedShipments,
            completedParcels,
            todayShipments,
            todayParcels,
            pendingParcels,
            activeShipmentParcelCount
        })
    }
}