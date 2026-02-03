import { Request, Response, NextFunction } from "express";

export interface IAgencyWalletController {
    getAgencyWalletOverview(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    createAddMoneyOrder(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}