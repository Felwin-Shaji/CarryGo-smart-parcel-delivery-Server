import { Request, Response, NextFunction } from "express";

export interface IWorkerWalletController {
    getWorkerWalletOverview(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    createAddMoneyOrder(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}