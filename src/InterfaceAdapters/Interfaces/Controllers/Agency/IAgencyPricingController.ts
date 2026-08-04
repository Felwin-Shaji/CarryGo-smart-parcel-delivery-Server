import type { Response, Request } from "express";

export interface IAgencyPricingController {
    getAgencyPricing(req: Request, res: Response): Promise<Response | void>;
    upsertAgencyPricing(req: Request, res: Response): Promise<Response | void>;
}