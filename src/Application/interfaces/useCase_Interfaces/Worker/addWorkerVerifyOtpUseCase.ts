export interface IWorkerVerifyOtpUseCase {
    verify(email: string,  otp: string): Promise<boolean>;
}
