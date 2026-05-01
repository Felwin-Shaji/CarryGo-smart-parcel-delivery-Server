import { Request, Response } from "express";


export interface IUserController {
    getUserProfile(req: Request, res: Response): Promise<Response | void>;
    updateUserProfile(req: Request, res: Response): Promise<Response | void>;
} 