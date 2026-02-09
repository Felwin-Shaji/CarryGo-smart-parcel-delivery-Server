 import { Request, Response, NextFunction } from "express";
 
 export interface ITravelerController {
    submitKYC(req: Request, res: Response, next: NextFunction): Promise<void>;
}