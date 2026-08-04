import { Request, Response } from "express";

export interface IUserBookingController {
    checkServiceableAgency(req: Request, res: Response): Promise<Response | void>;
    calculatePrice(req: Request, res: Response): Promise<Response | void>;
}