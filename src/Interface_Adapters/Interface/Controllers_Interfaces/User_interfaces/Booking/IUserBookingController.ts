import { Request, Response, NextFunction } from "express";

export interface IUserBookingController  {
    validatePincode(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    // getServiceableHubsWithAgency(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    calculatePrice(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}