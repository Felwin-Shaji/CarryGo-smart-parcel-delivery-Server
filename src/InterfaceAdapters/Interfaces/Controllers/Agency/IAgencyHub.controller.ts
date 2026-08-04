import type { Response, Request } from "express";

export interface IAgencyHubController {
    addNewHubBasicInfo(req: Request, res: Response): Promise<Response | void>;
    addNewHub(req: Request, res: Response): Promise<Response | void>;
    getHubs(req: Request, res: Response): Promise<Response | void>
}