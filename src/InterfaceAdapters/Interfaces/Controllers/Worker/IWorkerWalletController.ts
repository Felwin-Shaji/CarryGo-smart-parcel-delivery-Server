import { Request, Response } from "express";

export interface IWorkerWalletController {
    getWorkerWalletOverview(req: Request, res: Response): Promise<Response | void>;
    createAddMoneyOrder(req: Request, res: Response): Promise<Response | void>;
}