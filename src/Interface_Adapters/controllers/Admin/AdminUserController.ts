import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IGetUsersUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/GetUsers.usecase";
import { IUpdateUserStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/UpdateUserStatus.usecase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IAdminUserController } from "../../../Application/interfaces/Controllers_Interfaces/Admin_Interfaces/adminUser.controller";
import { GetUserDto } from "../../../Application/Dto/User/user.dto";
import { ApiResponse } from "../../presenters/ApiResponse";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";



@injectable()
export class AdminUserController implements IAdminUserController {

  constructor(
    @inject("IGetUsersUseCase") private _getUsersUseCase: IGetUsersUseCase,

    @inject("IUpdateUserStatusUseCase") private _updateUserStatusUseCase: IUpdateUserStatusUseCase
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
}
