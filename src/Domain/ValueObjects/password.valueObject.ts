import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


export class PasswordVo {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static async create(rawPassword: string): Promise<PasswordVo> {
        if (!this.validate(rawPassword)) {
            throw new Error("Password must be at least 6 characters");
        }
        const soltRounds = Number(process.env.SALT_ROUNDS)
        const hash = await bcrypt.hash(rawPassword, soltRounds);
        return new PasswordVo(hash);
    }

    static validate(value: string): boolean {
        return value.length >= 6;
    }

    async compare(inputPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, this._value);
    }

    get value(): string {
        return this._value;
    }
}
