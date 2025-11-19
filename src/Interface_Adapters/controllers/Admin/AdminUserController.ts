import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IGetUsersUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/GetUsers.usecase";
import { IAdminUserController } from "./interfaces/AdminController.interface";

@injectable()
export class AdminUserController implements IAdminUserController {

  constructor(
    @inject("IGetUsersUseCase")
    private getUsersUseCase: IGetUsersUseCase
  ) {}

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.getUsersUseCase.execute({
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
}
