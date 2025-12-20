import { Request, Response, NextFunction } from "express";


export interface IUserController {
    getUserProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    updateUserProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
} 