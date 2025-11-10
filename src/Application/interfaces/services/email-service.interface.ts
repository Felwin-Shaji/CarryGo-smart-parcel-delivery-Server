export interface IMailService{
    sendOTP(email:string,otp:string):Promise<void>;
}

