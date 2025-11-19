import type { IOtpModel } from "../../../../Domain/Entities/Iotp.js";
import type { IBaseRepository } from "../base.repository.js";

export interface IOtpRepository extends IBaseRepository<IOtpModel>{
    generateOtp():string;
};