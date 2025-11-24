export interface IOtpService {
    generateOtp(length?: number): string;
    hashOtp(otp: string): Promise<string>;
    compareOtp(plainOtp: string, hashedOtp: string): Promise<boolean>;
}
