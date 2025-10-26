import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class OtpVo {
    constructor(private readonly otp: string) { }

    static async create(rawOtp: string): Promise<OtpVo> {
        if (!this.validate(rawOtp)) {
            throw new Error("Invalid OTP. OTP must be a 4-digit numeric string.");
        }
        const soltRounds = Number(process.env.SALT_ROUNDS)
        const hash = await bcrypt.hash(rawOtp, soltRounds)
        return new OtpVo(hash);
    }

    static validate(otp: string): boolean {
        return /^\d{4}$/.test(otp);
    }

    get value(): string {
        return this.otp;
    }

}