import type { Response, Request,  NextFunction } from "express";

export interface IAdminAgencyController {
    getAgencies(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getAgencyById(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}