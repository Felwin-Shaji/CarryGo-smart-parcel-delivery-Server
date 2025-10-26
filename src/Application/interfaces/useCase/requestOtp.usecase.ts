export interface ISendOtpUseCase {
    execute(name: string, email: string, mobile: string, password: string): Promise<void>;
}