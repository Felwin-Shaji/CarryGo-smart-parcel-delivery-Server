import { Request, Response } from "express";

export interface IAgencyProfileController {
    getAgencyProfile(req: Request, res: Response): Promise<Response | void>;
    editAgencyProfile(req: Request, res: Response): Promise<Response | void>;
    resetAgencyPassword(req: Request, res: Response): Promise<Response | void>;
}