import type { Response, Request } from "express";


export interface IAdminProfileController {
    getAdminProfile(req: Request, res: Response): Promise<Response | void>;

    editAdminProfile(req: Request, res: Response): Promise<Response | void>;

    resetAdminPassword(req: Request, res: Response): Promise<Response | void>;
}