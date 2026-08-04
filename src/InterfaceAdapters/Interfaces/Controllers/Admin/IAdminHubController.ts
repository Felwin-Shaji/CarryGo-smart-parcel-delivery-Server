import type { Response, Request } from "express";

export interface IAdminHubController {
    getHubById(req: Request, res: Response): Promise<Response | void>;
}