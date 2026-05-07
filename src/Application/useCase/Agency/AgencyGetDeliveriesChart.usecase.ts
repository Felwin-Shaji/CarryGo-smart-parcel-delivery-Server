import { inject, injectable } from "tsyringe";
import { IAgencyGetDeliveriesChartUseCase } from "../../interfaces/useCase_Interfaces/Agency/IAgencyGetDeliveriesChartUseCase";
import { IBookingRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { DeliveriesChartRequestDTO, DeliveriesChartResponseDTO } from "../../Dto/Agency/agencyDashboard.dto";

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