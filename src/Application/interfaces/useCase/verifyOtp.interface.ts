export interface IVerifyOtpUseCase{
    execute(otp:string,email:string):Promise<void>
}