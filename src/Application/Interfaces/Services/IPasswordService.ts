export interface IPasswordService {
    hashPassword(password: string): Promise<string>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    generateCustomPassword(email: string, mobile: string): string;
}
