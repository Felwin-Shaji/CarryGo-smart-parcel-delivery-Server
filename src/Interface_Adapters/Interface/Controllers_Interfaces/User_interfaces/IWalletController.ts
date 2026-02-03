import { Request, Response, NextFunction } from "express";

export interface IWalletController {
    getWalletOverview(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}