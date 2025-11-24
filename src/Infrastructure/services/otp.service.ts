import bcrypt from "bcrypt";
import { IOtpService } from "../../Application/interfaces/services_Interfaces/otp-service.interface";
import dotenv from "dotenv";
dotenv.config()
export class OtpService implements IOtpService {

    generateOtp(length: number = 4): string {
        let otp = "";
        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    };

    async hashOtp(otp: string): Promise<string> {
        const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
        return await bcrypt.hash(otp, saltRounds);
    };

    async compareOtp(plainOtp: string, hashedOtp: string): Promise<boolean> {
        return await bcrypt.compare(plainOtp, hashedOtp);
    };
};
