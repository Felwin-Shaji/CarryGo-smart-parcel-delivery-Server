import { GetHubDashboardSummaryResponseDTO } from "../../DTOs/Hub/HubDashboardDTO";
import { IHubShipmentRepository } from "../../Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/worker.repository";
import { IGetHubDashboardSummaryUseCase } from "../../Interfaces/UseCases/Hub/IGetHubDashboardSummaryUseCase";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetHubDashboardSummaryUseCase implements IGetHubDashboardSummaryUseCase {
    constructor(
        @inject("IHubShipmentRepository") private _shipmentRepo: IHubShipmentRepository,
        @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,

    ) { };

    async execute(hubId: string): Promise<GetHubDashboardSummaryResponseDTO> {

        const shipmentSummary = await this._shipmentRepo.getShipmentSummary(hubId);

        const [
            totalWorkers,
            blocked,
            kycPending,
            kycApproved,
            kycRejected,
        ] = await Promise.all([
            this._workerRepo.countByFilter({ hubId }),
            this._workerRepo.countByFilter({ hubId, blocked: true }),
            this._workerRepo.countByFilter({ hubId, kycStatus: "PENDING" }),
            this._workerRepo.countByFilter({ hubId, kycStatus: "APPROVED" }),
            this._workerRepo.countByFilter({ hubId, kycStatus: "REJECTED" }),
        ]);

        return {
            shipments: shipmentSummary,
            workers: {
                total: totalWorkers,
                blocked,
                kyc: {
                    pending: kycPending,
                    approved: kycApproved,
                    rejected: kycRejected,
                },
            },
        };

    }
}