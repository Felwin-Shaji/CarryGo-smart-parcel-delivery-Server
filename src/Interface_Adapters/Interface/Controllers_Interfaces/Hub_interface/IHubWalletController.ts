import { Request, Response, NextFunction } from "express";

export interface IHubWalletController {
    getHubWalletOverview(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    createAddMoneyOrder(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}