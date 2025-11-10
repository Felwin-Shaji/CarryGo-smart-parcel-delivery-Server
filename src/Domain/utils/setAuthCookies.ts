import type { Response } from "express";
// import { config } from "../config";

export const setAuthCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string,
    accessTokenName: string,
    refreshTokenName: string,
): void => {
    const isProd = process.env.NODE_ENV === "production";
    process.env.NODE_ENV

    res.cookie(accessTokenName, accessToken, {
        httpOnly: true,
        sameSite: isProd ? "strict" : "lax",
        secure: isProd,
        maxAge: 15 * 60 * 1000,
        path: "/",
    });

    res.cookie(refreshTokenName, refreshToken, {
        httpOnly: true,
        sameSite: isProd ? "strict" : "lax",
        secure: isProd,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });
};

export const clearAuthCookies = (
    res: Response,
    accessTokenName: string,
    refreshTokenName: string,
): void => {
    res.clearCookie(accessTokenName);
    res.clearCookie(refreshTokenName);
};
