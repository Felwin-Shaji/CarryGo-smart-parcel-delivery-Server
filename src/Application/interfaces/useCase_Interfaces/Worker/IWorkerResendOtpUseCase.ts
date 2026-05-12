export interface IWorkerResendOtpUseCase {
    resendOtp(email: string): Promise<Date>;
};