import type { Response, Request,  NextFunction } from "express";

export interface IAgencyPricingController{
    getAgencyPricing(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    upsertAgencyPricing(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}