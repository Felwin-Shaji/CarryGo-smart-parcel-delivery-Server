import { Request, Response } from "express";

export interface IWalletController {
    getWalletOverview(req: Request, res: Response): Promise<Response | void>;
    createAddMoneyOrder(req: Request, res: Response): Promise<Response | void>;
}