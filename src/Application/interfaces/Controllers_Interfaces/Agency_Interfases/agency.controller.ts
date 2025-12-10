import type { Response, Request,  NextFunction } from "express";

export interface IAgencyController {
    submitKYC(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getReSubmitKyc(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    reSubmitKyc(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}