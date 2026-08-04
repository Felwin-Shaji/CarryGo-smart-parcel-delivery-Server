import { inject, injectable } from "tsyringe";
import { IAgencyGetDeliveriesChartUseCase } from "../../Interfaces/UseCases/Agency/IAgencyGetDeliveriesChartUseCase";
import { IBookingRepository } from "../../Interfaces/Repositories/User/IBookingRepository";
import { DeliveriesChartRequestDTO, DeliveriesChartResponseDTO } from "../../DTOs/Agency/agencyDashboard.dto";

@injectable()
export class AgencyGetDeliveriesChartUseCase implements IAgencyGetDeliveriesChartUseCase {
    constructor(
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository
    ) { }

    async execute(agencyId: string, query: DeliveriesChartRequestDTO): Promise<DeliveriesChartResponseDTO> {
        const { fromDate, toDate } = query;

        const queryPayload: DeliveriesChartRequestDTO = {};
        if (fromDate) queryPayload.fromDate = fromDate;
        if (toDate) queryPayload.toDate = toDate;

        return await this._bookingRepo.groupDeliveredByDate(agencyId, queryPayload);
    };
}