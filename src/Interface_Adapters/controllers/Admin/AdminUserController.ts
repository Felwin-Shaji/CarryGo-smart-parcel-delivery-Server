import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IGetUsersUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/GetUsers.usecase";
import { IUpdateUserStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/UpdateUserStatus.usecase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IAdminUserController } from "../../Interface/Controllers_Interfaces/Admin_Interfaces/adminUser.controller";
import { GetUserDto, updateUserKycStatusDTO } from "../../../Application/Dto/User/user.dto";
import { ApiResponse } from "../../presenters/ApiResponse";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { AppError } from "../../../Domain/utils/customError";
import { IUpdateUserKycStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/IUpdateuSERKycStatusUseCase";
import { IGetUserOverviewUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/IGetUserOverviewUseCase";



@injectable()
export class AdminUserController implements IAdminUserController {

  constructor(
    @inject("IGetUsersUseCase") private _getUsersUseCase: IGetUsersUseCase,
    @inject("IUpdateUserStatusUseCase") private _updateUserStatusUseCase: IUpdateUserStatusUseCase,
    @inject("IUpdateUserKycStatusUseCase") private _updateUserKycStatusUseCase: IUpdateUserKycStatusUseCase,
    @inject("IGetUserOverviewUseCase") private _getUserOverviewUseCase: IGetUserOverviewUseCase
  ) { }

  getUsers = async (req: Request, res: Response, next: NextFunction) => { ////////////////////////////
    try {

      const dto: GetUserDto = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: req.query.search?.toString() || "",
        sortBy: req.query.sortBy?.toString() || "",
        sortOrder: req.query.sortOrder === "desc" ? "desc" : "asc",
      };

      const result = await this._getUsersUseCase.execute(dto);

      return res.status(STATUS.OK).json(
        ApiResponse.success(
          USER_MESSAGES.LIST_FETCH_SUCCESS,
          result,
        )
      );

    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

      const userOverview = await this._getUserOverviewUseCase.execute(userId);

      return res.status(STATUS.OK).json(
        ApiResponse.success(
          USER_MESSAGES.USER_FETCH_SUCCESS,
          userOverview
        )
      )


    } catch (error) {
      next(error)
    }
  }

  UpdateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const { isBlocked } = req.body;

      if (!userId) return res.status(STATUS.BAD_REQUEST).json(ApiResponse.failure(USER_MESSAGES.USER_ID_MISSING));

      await this._updateUserStatusUseCase.execute(userId, isBlocked);

      return res.status(STATUS.OK).json(
        ApiResponse.success(
          USER_MESSAGES.STATUS_UPDATED,
        )
      )

    } catch (error) {
      next(error)
    }
  }

  updateUserKyc = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);
      const dto = req.body as updateUserKycStatusDTO;

      const kycStatus = await this._updateUserKycStatusUseCase.execute(userId, dto)

      return res.status(STATUS.OK).json(
        ApiResponse.success(
          USER_MESSAGES.KYC_STATUS_UPDATED, kycStatus
        )
      )

    } catch (error) {
      next(error)
    }
  }
}
