import { Request, Response, NextFunction } from "express";
export interface IAdminPricingPolicyController {
    getAdminPricing(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    createAdminPricing(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}