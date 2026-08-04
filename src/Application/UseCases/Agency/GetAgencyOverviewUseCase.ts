import { inject, injectable } from "tsyringe";
import { GetAgencyOverviewResponseDTO } from "../../DTOs/Agency/AgencyDTO";
import { IGetAgencyOverviewUseCase } from "../../Interfaces/UseCases/Agency/IGetAgencyOverviewUseCase";
import { IGetAgencyWithKYCUseCase } from "../../Interfaces/UseCases/Agency/IGetAgencyWithKYCUseCase";
import { IGetHubsUsecase } from "../../Interfaces/UseCases/Hub/IGetHubsUseCase";
import { GetHubsDTO } from "../../DTOs/Hub/HubDTO";
import { AppError } from "../../../Domain/Utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/Constants/Messages/agencyMessages";

@injectable()
export class GetAgencyOverviewUseCase implements IGetAgencyOverviewUseCase {
    constructor(
        @inject("IGetAgencyWithKYCUseCase") private _getAgencyWithKYCUseCase: IGetAgencyWithKYCUseCase,
        @inject("IGetHubsUsecase") private _getHubsUsecase: IGetHubsUsecase,

    ) { }
    async execute(agencyId: string): Promise<GetAgencyOverviewResponseDTO> {
        const agency = await this._getAgencyWithKYCUseCase.execute(agencyId);
        if (!agency) throw new AppError(AGENCY_MESSAGES.AGENCY_KYC_NOT_FOUND);

        const dto: GetHubsDTO = {
            page: 1,
            limit: 10,
            search: "",
            sortBy: "createdAt",
            sortOrder: "asc",
        };

        const hubs = await this._getHubsUsecase.execute(agencyId, dto);
        return { agency, hubs }
    }
}