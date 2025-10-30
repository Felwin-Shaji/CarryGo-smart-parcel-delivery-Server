export interface IVerifyOtpAndRegisterUseCase{
    execute(otp:string):Promise<void>
}