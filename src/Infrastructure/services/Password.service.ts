import bcrypt from "bcrypt";
import type { IPasswordService } from "../../Application/interfaces/services_Interfaces/password-service.interface";

export class PasswordService implements IPasswordService {
    private readonly _saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this._saltRounds);
    }

    async comparePassword(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    generateCustomPassword(email: string, mobile: string): string {
        const safeEmail: string = email ?? "";
        const safeMobile: string = mobile ?? "";

        const prefix = safeEmail.split("@")[0]?.substring(0, 4).toLowerCase() || "user";
        const last4 = safeMobile.slice(-4) || "0000";

        return `${prefix}@${last4}`;
    }


}
