import type { Response, Request,  NextFunction } from "express";

export interface IAgencyHubController{
    addNewHub(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}