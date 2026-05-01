import { Request, Response } from "express";
import { IUserController } from "../../Interface/Controllers_Interfaces/User_interfaces/IUserController";
import { ApiResponse } from "../../presenters/ApiResponse";
import { inject, injectable } from "tsyringe";
import { IGetUserProfileUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/GetUserProfile.useCase";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { BaseEditUserProfileRequestDto, UserResetPasswordRequestDTO } from "../../../Application/Dto/User/user.dto";
import { IEditUserProfileUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/EditUserProfile.usecase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IUserReserUserPassword } from "../../../Application/interfaces/useCase_Interfaces/user/ReserUserPassword.usecase";
import { AppError } from "../../../Domain/utils/customError";

@injectable()
export class UserController implements IUserController {
    constructor(
        @inject("IGetUserProfileUseCase") private _getUserProfileUseCase: IGetUserProfileUseCase,
        @inject("IEditUserProfileUseCase") private _editUserProfileUseCase: IEditUserProfileUseCase,
        @inject("IUserReserUserPassword") private _userReserUserPassword: IUserReserUserPassword,
    ) { }

    getUserProfile = async (req: Request, res: Response): Promise<Response | void> => {

        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)

        const userProfileData = await this._getUserProfileUseCase.execute(userId)

        return res.status(200).json(ApiResponse.success(
            USER_MESSAGES.PROFILE_FETCHED,
            userProfileData
        ))
    }

    updateUserProfile = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as BaseEditUserProfileRequestDto;
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)

        await this._editUserProfileUseCase.execute(userId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.PROFILE_UPDATED
            )
        )
    };

    resetUserPassword = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as UserResetPasswordRequestDTO;
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)

        await this._userReserUserPassword.execute(userId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.RESET_PASSWORD
            )
        )
    }
};