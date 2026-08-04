import { Request, Response } from "express";

export interface IAgencyRouteController {
    createRouteGroup(req: Request, res: Response): Promise<Response | void>;
}