import type { Response } from "express";
// import { config } from "../config";

const getEnvNumber = (key: string, fallback: number): number => {
    const value = Number(process.env[key]);
    return Number.isFinite(value) ? value : fallback;
};


export const setAuthCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string,
    accessTokenName: string,
    refreshTokenName: string,
): void => {
    const isProd = process.env.NODE_ENV === "production";
    const ACCESS_TOKEN_MAX_AGE = getEnvNumber(
        "ACCESS_TOKEN_MAX_AGE",
        15 * 60 * 1000
    );

    const REFRESH_TOKEN_MAX_AGE = getEnvNumber(
        "REFRESH_TOKEN_MAX_AGE",
        7 * 24 * 60 * 60 * 1000
    );

    res.cookie(accessTokenName, accessToken, {
        httpOnly: true,
        sameSite: isProd ? "strict" : "lax",
        secure: isProd,
        maxAge: ACCESS_TOKEN_MAX_AGE,
        path: "/",
    });

    res.cookie(refreshTokenName, refreshToken, {
        httpOnly: true,
        sameSite: isProd ? "strict" : "lax",
        secure: isProd,
        maxAge: REFRESH_TOKEN_MAX_AGE,
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
