import type { Response, Request } from "express";

export interface IAgencyController {
    submitKYC(req: Request, res: Response): Promise<Response | void>;
    getReSubmitKyc(req: Request, res: Response): Promise<Response | void>;
    reSubmitKyc(req: Request, res: Response): Promise<Response | void>;
}