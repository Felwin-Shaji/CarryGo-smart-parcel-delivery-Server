import { inject, injectable } from "tsyringe";
import { IGetHubOverviewUseCase } from "../../Interfaces/UseCases/Hub/IGetHubOverviewUseCase";
import { GetHubOverviewResponseDTO } from "../../DTOs/Hub/HubOverviewDTO";
import { IGetHubUseCase } from "../../Interfaces/UseCases/Hub/IGetHubUseCase";
import { IGetWorkersUseCase } from "../../Interfaces/UseCases/Worker/IGetWorkersUseCase";
import { AppError } from "../../../Domain/Utils/customError";
import { HUB_MESSAGES } from "../../../Infrastructure/Constants/Messages/hubMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { GetWorkersDTO } from "../../DTOs/Worker/WorkerDTO";

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