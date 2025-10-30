import { BaseRepository } from "./baseRepositories.js";
import type { IOtpRepository } from "../../Application/interfaces/repositories/auth/otp.repository.js";
import { injectable } from "tsyringe";
import type { IOtpModel } from "../../Domain/Entities/Iotp.js";
import { OtpModel } from "../database/models/OtpModel.js";

@injectable()
export class OtpRepository extends BaseRepository<IOtpModel> implements IOtpRepository {
    constructor() {
        super(OtpModel)
    };

    generateOtp(): string {
        return (Math.floor(Math.random() * 9000) + 1000).toString();
    };
}