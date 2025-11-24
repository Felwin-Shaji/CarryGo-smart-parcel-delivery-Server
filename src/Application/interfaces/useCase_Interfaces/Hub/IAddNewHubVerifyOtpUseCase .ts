export interface IAddNewHubVerifyOtpUseCase {
    verify(email: string, tempHubId: string, otp: string): Promise<boolean>;
}
