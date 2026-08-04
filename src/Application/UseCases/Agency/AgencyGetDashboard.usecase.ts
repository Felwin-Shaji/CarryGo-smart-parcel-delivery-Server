import { inject, injectable } from "tsyringe";
import { AgencyDashboardResponseDTO } from "../../DTOs/Agency/agencyDashboard.dto";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/agency.repository";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/hub.repository";
import { IAgencyGetDashboardUsecase } from "../../Interfaces/UseCases/Agency/IAgencyGetDashboardUseCase";
import { ITransactionRepository } from "../../Interfaces/Repositories/Wallet/ITransactionRepository";
import { IBookingRepository } from "../../Interfaces/Repositories/User/IBookingRepository";
import { IAgencyPricingRepository } from "../../Interfaces/Repositories/Agency/agencyPricing.repository";
import { IPricingPolicyRepository } from "../../Interfaces/Repositories/Admin/IPricingPolicyRepository";
import { AppError } from "../../../Domain/Utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

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