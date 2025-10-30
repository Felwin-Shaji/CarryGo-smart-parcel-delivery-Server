import type { Request, Response } from "express";

export interface IAuthController{
    sendOtp(req:Request,res:Response):Promise<Response>
    registerUser(req:Request,res:Response):Promise<Response>
};