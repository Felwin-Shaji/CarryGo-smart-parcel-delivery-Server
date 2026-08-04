import { Request, Response } from "express";

export interface IAdminWalletController {
    getAdminWalletOverview(req: Request, res: Response): Promise<Response | void>;
    createAddMoneyOrder(req: Request, res: Response): Promise<Response | void>;
}