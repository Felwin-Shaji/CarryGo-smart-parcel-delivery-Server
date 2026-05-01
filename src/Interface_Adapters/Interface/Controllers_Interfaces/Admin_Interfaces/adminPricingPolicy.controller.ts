import { Request, Response } from "express";

export interface IAdminPricingPolicyController {
    getAdminAgencyPricing(req: Request, res: Response): Promise<Response | void>;
    createAdminAgencyPricing(req: Request, res: Response): Promise<Response | void>;
}