import type { NextFunction, Request, Response } from "express";

export interface IAuthController{
    sendOtp(req:Request,res:Response,next:NextFunction):Promise<Response | void>
    verifyOtp(req:Request,res:Response,next:NextFunction):Promise<Response | void>
};