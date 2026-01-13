import { Request, Response, NextFunction } from "express";

export interface IAddressController {
    reverseGeocode(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}