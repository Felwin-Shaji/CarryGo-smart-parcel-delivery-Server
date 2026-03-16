import { Request, Response, NextFunction } from "express";

export interface IAgencyRouteController {
    createRouteGroup(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}