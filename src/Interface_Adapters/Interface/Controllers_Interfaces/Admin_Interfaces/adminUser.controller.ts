import type { Response, Request } from "express";

export interface IAdminUserController {
    getUsers(req: Request, res: Response): Promise<Response | void>;

}