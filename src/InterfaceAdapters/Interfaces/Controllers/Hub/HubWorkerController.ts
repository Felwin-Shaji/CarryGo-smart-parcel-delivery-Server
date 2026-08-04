import { Request, Response } from "express";

export interface IHubWorkerController {
    addNewWorker(req: Request, res: Response): Promise<Response | void>;
};