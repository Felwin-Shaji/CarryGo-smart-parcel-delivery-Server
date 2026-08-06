import type { Response, Request } from "express";

export interface IAdminController {
    getAgencies(req: Request, res: Response): Promise<Response | void>;
    getUsers(req: Request, res: Response): Promise<Response | void>;
}