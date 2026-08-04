import { Request, Response } from "express";

export interface IAddressController {
    reverseGeocode(req: Request, res: Response): Promise<Response | void>;
}