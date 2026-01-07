import { Request, Response, NextFunction } from "express";

export interface IAgencyProfileController {
    getAgencyProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    editAgencyProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    resetAgencyPassword(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}