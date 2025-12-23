import type { Response, Request,  NextFunction } from "express";

export interface IAdminController {
    getAgencies(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}