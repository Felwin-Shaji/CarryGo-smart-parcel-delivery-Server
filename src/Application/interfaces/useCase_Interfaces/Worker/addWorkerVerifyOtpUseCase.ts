export interface IWorkerVerifyOtpUseCase {
    verify(email: string, tempWorkerId: string, otp: string): Promise<boolean>;
}
