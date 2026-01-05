import { inject, injectable } from "tsyringe";
import { GetAgencyOverviewResponseDTO } from "../../Dto/Agency/agency.dto";
import { IGetAgencyOverviewUseCase } from "../../interfaces/useCase_Interfaces/Agency/GetAgencyOverview.usecase";
import { IGetAgencyWithKYCUseCase } from "../../interfaces/useCase_Interfaces/Agency/GetAgencyWithKYCUseCase";
import { IGetHubsUsecase } from "../../interfaces/useCase_Interfaces/Hub/IGetHubsUsecase";
import { GetHubsDTO } from "../../Dto/Hub/hub.dto";
import { AppError } from "../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";

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