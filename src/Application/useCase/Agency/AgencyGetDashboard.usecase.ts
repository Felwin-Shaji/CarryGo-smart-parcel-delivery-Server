import { inject, injectable } from "tsyringe";
import { AgencyDashboardResponseDTO } from "@/Application/Dto/Agency/agencyDashboard.dto";

import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";

import { AppError } from "@/Domain/utils/customError";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { AGENCY_MESSAGES } from "@/Infrastructure/constants/messages/agencyMessages";
import { IAgencyGetDashboardUsecase } from "@/Application/interfaces/useCase_Interfaces/Agency/IAgencyGetDashboardUseCase";
import { ITransactionRepository } from "@/Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { IBookingRepository } from "@/Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IAgencyPricingRepository } from "@/Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agencyPricing.repository";
import { IPricingPolicyRepository } from "@/Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";

@injectable()
export class AgencyGetDashboardUsecase implements IAgencyGetDashboardUsecase {
    constructor(
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("ITransactionRepository") private _transactionRepo: ITransactionRepository,
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("IAgencyPricingRepository") private _pricingRepo: IAgencyPricingRepository,
        @inject("IPricingPolicyRepository") private _policyRepo: IPricingPolicyRepository,
    ) { }

    async execute(agencyId: string): Promise<AgencyDashboardResponseDTO> {

        const agency = await this._agencyRepo.findById({ _id: agencyId });

        if (!agency) {
            throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
        }

        const [
            totalHubs,
            totalWorkers,
            totalRevenue,
            totalCompletedBookings,
            agencyPricing,
            platformPolicy
        ] = await Promise.all([
            this._hubRepo.countByAgency(agencyId),
            this._hubRepo.countWorkersByAgency(agencyId),
            this._transactionRepo.sumSettlementByAgency(agencyId),
            this._bookingRepo.countDeliveredByAgency(agencyId),
            this._pricingRepo.getPricingByAgency(agencyId, "STANDARD"),
            this._policyRepo.getActiveByDeliveryModel("AGENCY")
        ]);

        const alerts: AgencyDashboardResponseDTO["alerts"] = [];

        if (
            agencyPricing &&
            platformPolicy &&
            agencyPricing.policyVersion < platformPolicy.policyVersion
        ) {
            alerts.push({
                type: "PRICING_OUTDATED",
                message: "Your pricing policy is outdated",
            });
        }

        return {
            alerts,
            stats: {
                totalHubs: totalHubs || 0,
                totalWorkers: totalWorkers || 0,
                totalRevenue: totalRevenue || 0,
                totalCompletedBookings: totalCompletedBookings || 0,
            },
        };
    }

}