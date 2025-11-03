import type { Request, Response } from "express";

export interface IAuthController{
    sendOtp(req:Request,res:Response):Promise<Response>
    varifyOtp(req:Request,res:Response):Promise<Response>
};