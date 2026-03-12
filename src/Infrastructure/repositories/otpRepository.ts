import { BaseRepository } from "./baseRepositories";
import type { IOtpRepository } from "../../Application/interfaces/repositories_interfaces/authRepositories_Interfaces/otp.repository";
import { injectable } from "tsyringe";
import type { IOtpModel } from "../../Domain/Entities/Iotp";
import { OtpModel } from "../database/models/OtpModel";

@injectable()
export class OtpRepository extends BaseRepository<IOtpModel> implements IOtpRepository {
    constructor() {
        super(OtpModel)
    };

    generateOtp(): string {
        return (Math.floor(Math.random() * 9000) + 1000).toString();
    };
}