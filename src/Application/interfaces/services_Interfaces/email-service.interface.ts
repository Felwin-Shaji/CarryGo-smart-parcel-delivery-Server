export interface IMailService{
    sendOTP(email:string,otp:string):Promise<void>;
    sendCustomPassword(email: string ): Promise<void>
}

