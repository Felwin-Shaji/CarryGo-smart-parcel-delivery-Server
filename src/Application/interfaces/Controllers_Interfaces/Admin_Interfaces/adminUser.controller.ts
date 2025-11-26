import type { Response, Request,  NextFunction } from "express";

export interface IAdminUserController{
    getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void>;

}