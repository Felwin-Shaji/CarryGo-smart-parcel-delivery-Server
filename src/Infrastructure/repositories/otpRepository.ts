import { Model } from "mongoose";
import { BaseRepository } from "./baseRepositories.js";
import type { IOtpRepository } from "../../Application/interfaces/repositories/auth/otp.repository.js";

export class OtpRepository<T> extends BaseRepository<T> implements IOtpRepository<T> {
    constructor(model: Model<T>) {
        super(model)
    }

    generateOtp(): string {
        return (Math.floor(Math.random() * 9000) + 1000).toString();
    }
}