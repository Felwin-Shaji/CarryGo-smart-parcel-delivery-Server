import type { IOtpModel } from "../../../../Domain/Entities/IOtpModel.js";
import type { IBaseRepository } from "../IBaseRepository.js";

export interface IOtpRepository extends IBaseRepository<IOtpModel>{
    generateOtp():string;
};