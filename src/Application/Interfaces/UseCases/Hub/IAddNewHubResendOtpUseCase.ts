export interface IAddNewHubResendOtp {
    resend(email: string): Promise<{
        success: boolean;
        expiresAt: string;
    }>;
}
