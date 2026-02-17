import { Request, Response, NextFunction } from "express";
export interface IAdminPricingPolicyController {
    getAdminAgencyPricing(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    createAdminAgencyPricing(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}