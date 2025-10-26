import type { IBaseRepository } from "../base.repository.js";

export interface IOtpRepository<T> extends IBaseRepository<T>{
    generateOtp():string;
};