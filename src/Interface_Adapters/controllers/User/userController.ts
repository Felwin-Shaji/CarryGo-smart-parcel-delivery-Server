import { Request, Response, NextFunction } from "express";
import { IUserController } from "../../../Application/interfaces/Controllers_Interfaces/User_interfaces/IUserController";
import { ApiResponse } from "../../presenters/ApiResponse";
import { inject, injectable } from "tsyringe";
import { IGetUserProfileUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/GetUserProfile.useCase";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";

@injectable()
export class UserController implements IUserController {
    constructor(
        @inject("IGetUserProfileUseCase") private _getUserProfileUseCase: IGetUserProfileUseCase,
    ) { }

    getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const userId = req.user?.id!;

            const userProfileData = await this._getUserProfileUseCase.execute(userId)

            return res.status(200).json(ApiResponse.success(
                USER_MESSAGES.PROFILE_FETCHED,
                userProfileData
            ))
        } catch (error) {
            next(error);
        }
    }
};