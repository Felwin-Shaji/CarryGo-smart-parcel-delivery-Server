import type { Response, Request,  NextFunction } from "express";

export interface IAgencyHubController{
    addNewHubBasicInfo(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    addNewHub(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}