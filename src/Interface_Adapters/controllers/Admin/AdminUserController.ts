import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IGetUsersUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/GetUsers.usecase";
import { IUpdateUserStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/UpdateUserStatus.usecase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IAdminUserController } from "../../../Application/interfaces/Controllers_Interfaces/Admin_Interfaces/adminUser.controller";


@injectable()
export class AdminUserController implements IAdminUserController {

  constructor(
    @inject("IGetUsersUseCase") private _getUsersUseCase: IGetUsersUseCase,

    @inject("IUpdateUserStatusUseCase") private _updateUserStatusUseCase: IUpdateUserStatusUseCase
  ) { }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._getUsersUseCase.execute({
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: req.query.search?.toString() || "",
        sortBy: req.query.sortBy?.toString() || "",
        sortOrder: req.query.sortOrder === "desc" ? "desc" : "asc",
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  UpdateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { isBlocked } = req.body;

      if (!id ) {
        return res.status(STATUS.BAD_REQUEST).json({
          success: false,
          message: "userId required"
        })
      }

      const dto: { userId: string, isBlocked: boolean } = {
        userId:id,
        isBlocked
      }

      await this._updateUserStatusUseCase.execute(dto)

      return res.status(STATUS.OK).json({
        success: true,
        message: "User status updated"
      })

    } catch (error) {
      next(error)
    }
  }
}
