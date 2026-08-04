import type { IOtpModel } from "../../../../Domain/Entities/OTP.js";
import type { IBaseRepository } from "../base.repository.js";

export interface IOtpRepository extends IBaseRepository<IOtpModel>{
    generateOtp():string;
};