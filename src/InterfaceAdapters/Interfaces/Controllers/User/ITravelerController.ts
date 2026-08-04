import { Request, Response, } from "express";

export interface ITravelerController {
    submitKYC(req: Request, res: Response): Promise<void>;
}