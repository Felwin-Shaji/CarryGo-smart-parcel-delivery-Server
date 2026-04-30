import { GetWorkerDashboardResponseDTO } from "@/Application/Dto/Workers/worker.dto";
import { HubShipment } from "@/Domain/Entities/Logistics/HubShipment";
import { HubWorker } from "@/Domain/Entities/Worker/Worker";
import { AppError } from "@/Domain/utils/customError";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";

export class WorkerDashboardMapper {

    static toResponse(params: {
        worker: HubWorker;
        activeShipment: HubShipment | null;
        completedShipments: number;
        completedParcels: number;
        todayShipments: number;
        todayParcels: number;
        pendingParcels: number;
        activeShipmentParcelCount: number;
    }): GetWorkerDashboardResponseDTO {

        const {
            worker,
            activeShipment,
            completedShipments,
            completedParcels,
            todayShipments,
            todayParcels,
            pendingParcels,
            activeShipmentParcelCount,
        } = params;

        if (!worker.id) {
            throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);
        }

        const totalParcels = completedParcels + pendingParcels;

        const completionRate =
            totalParcels === 0
                ? 0
                : Math.round((completedParcels / totalParcels) * 100);

        return {
            worker: {
                id: worker.id,
                name: worker.name,
                workerRole: worker.workerRole,
            },

            summary: {
                completedShipmentCount: completedShipments,
                completedParcelCount: completedParcels,
                todayShipmentCount: todayShipments,
                todayParcelHandledCount: todayParcels,
                pendingParcelCount: pendingParcels,
                completionRate,
            },

            activeShipment: activeShipment
                ? {
                    id: activeShipment.id ?? "",
                    type: activeShipment.type,
                    status: activeShipment.status,
                    fromHubId: activeShipment.fromHubId ?? "",
                    toHubId: activeShipment.toHubId ?? "",
                    parcelCount: activeShipmentParcelCount,
                }
                : null,
        };
    }
}