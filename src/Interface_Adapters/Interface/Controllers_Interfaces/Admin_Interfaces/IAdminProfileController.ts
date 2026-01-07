import type { Response, Request,  NextFunction } from "express";


export interface IAdminProfileController {
    getAdminProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void>;

    editAdminProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void>;

    resetAdminPassword(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}