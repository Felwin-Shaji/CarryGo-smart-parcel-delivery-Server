import { inject, injectable } from "tsyringe";
import { IGetHubOverviewUseCase } from "../../interfaces/useCase_Interfaces/Hub/IGetHubOverviewUseCase";
import { GetHubOverviewResponseDTO } from "../../Dto/Hub/hubOverview.dto";
import { IGetHubUseCase } from "../../interfaces/useCase_Interfaces/Hub/IGetHubUseCase";
import { IGetWorkersUseCase } from "../../interfaces/useCase_Interfaces/Worker/IGetWorkersUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { GetWorkersDTO } from "../../Dto/Workers/worker.dto";

@injectable()
export class GetHubOverviewUseCase implements IGetHubOverviewUseCase {
    constructor(
        @inject("IGetHubUseCase") private _getHubUseCase: IGetHubUseCase,
        @inject("IGetWorkersUseCase") private _getWorkersUseCase: IGetWorkersUseCase,

    ) { };


    async execute(hubId: string): Promise<GetHubOverviewResponseDTO> {

        const hub = await this._getHubUseCase.execute(hubId);

        if (!hub) throw new AppError(HUB_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const dto: GetWorkersDTO = {
            page: 1,
            limit: 10,
            search: "",
            sortBy: "createdAt",
            sortOrder: "asc",
        };

        const workers = await this._getWorkersUseCase.execute(hubId, dto);

        return { hub, workers }

    }
}   