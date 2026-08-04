import type { Request, Response } from "express";

export interface IAuthController {
    sendOtp(req: Request, res: Response): Promise<Response | void>;
    verifyOtp(req: Request, res: Response): Promise<Response | void>;
    refreshToken(req: Request, res: Response): Promise<Response | void>;
    login(req: Request, res: Response): Promise<Response | void>;
    logout(req: Request, res: Response): Promise<Response | void>;
    forgotPassword(req: Request, res: Response): Promise<Response | void>;
};