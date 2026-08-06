import type { Response, Request } from "express";

export interface IAdminAgencyController {
    getAgencies(req: Request, res: Response): Promise<Response | void>;
    getAgencyById(req: Request, res: Response): Promise<Response | void>;
}