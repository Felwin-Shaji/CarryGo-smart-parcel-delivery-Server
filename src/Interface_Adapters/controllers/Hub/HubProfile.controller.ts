import { Request, Response } from "express";
import { IEditHubProfileUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IEditHubProfileUseCase";
import { IGetHubProfileUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IGetHubProfileUseCase";
import { IResetHubPasswordUseCase } from "@/Application/interfaces/useCase_Interfaces/Hub/IResetHubPasswordUseCase";
import { AppError } from "@/Domain/utils/customError";
import { HUB_MESSAGES } from "@/Infrastructure/constants/messages/hubMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
import { inject, injectable } from "tsyringe";
import { EditHubProfileRequestDto, HubResetPasswordRequestDTO } from "@/Application/Dto/Hub/hubProfile.dto";

@injectable()
export class HubProfileController {
    constructor(
        @inject("IGetHubProfileUseCase") private _getHubProfileUseCase: IGetHubProfileUseCase,
        @inject("IEditHubProfileUseCase") private _editHubProfileUseCase: IEditHubProfileUseCase,
        @inject("IResetHubPasswordUseCase") private _hubResetHubPassword: IResetHubPasswordUseCase,
    ) { };

    getHubProfile = async (req: Request, res: Response): Promise<Response | void> => {
        const hubId = req.user?.id;
        if (!hubId) throw new AppError(HUB_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST)

        const hubProfileData = await this._getHubProfileUseCase.execute(hubId)

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.PROFILE_FETCHED,
                hubProfileData
            )
        );
    }

    editHubProfile = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as EditHubProfileRequestDto;

        const hubId = req.user?.id;
        if (!hubId) throw new AppError(HUB_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST)

        const updatedHubProfile = await this._editHubProfileUseCase.execute(hubId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.PROFILE_UPDATED,
                updatedHubProfile
            )
        )
    };

    resetHubPassword = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as HubResetPasswordRequestDTO;

        const hubId = req.user?.id;
        if (!hubId) throw new AppError(HUB_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        await this._hubResetHubPassword.execute(hubId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.PASSWORD_RESET
            )
        )
    }
}