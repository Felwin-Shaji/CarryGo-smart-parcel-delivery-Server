import { BaseRepository } from "./BaseRepository";
import type { IOtpRepository } from "../../Application/Interfaces/Repositories/Auth/IOTPRepository";
import { injectable } from "tsyringe";
import type { IOtpModel } from "../../Domain/Entities/IOtpModel";
import { OtpModel } from "../Database/Models/OtpModel";

@injectable()
export class OtpRepository extends BaseRepository<IOtpModel> implements IOtpRepository {
    constructor() {
        super(OtpModel)
    };

    generateOtp(): string {
        return (Math.floor(Math.random() * 9000) + 1000).toString();
    };
}