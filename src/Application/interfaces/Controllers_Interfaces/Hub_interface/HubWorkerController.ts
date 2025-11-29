import { Request, Response, NextFunction } from "express";

export interface IHubWorkerController {
    addNewWorker (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
};