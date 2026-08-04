import { Request, Response } from "express";

export interface IAgencyWalletController {
    getAgencyWalletOverview(req: Request, res: Response): Promise<Response | void>;
    createAddMoneyOrder(req: Request, res: Response): Promise<Response | void>;
}