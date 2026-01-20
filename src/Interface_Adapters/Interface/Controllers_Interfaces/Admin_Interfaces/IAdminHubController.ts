import type { Response, Request,  NextFunction } from "express";

export interface IAdminHubController {
    getHubById(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}