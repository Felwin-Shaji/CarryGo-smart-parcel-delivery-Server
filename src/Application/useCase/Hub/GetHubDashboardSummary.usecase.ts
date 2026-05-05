import { GetHubDashboardSummaryResponseDTO } from "@/Application/Dto/Hub/hubDashboar.dto";
import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IHubWorkerRepository } from "@/Application/interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IGetHubDashboardSummaryUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IGetHubDashboardSummaryUseCase";
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