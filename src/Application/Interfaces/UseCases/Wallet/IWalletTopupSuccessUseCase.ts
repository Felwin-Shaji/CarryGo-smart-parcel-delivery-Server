export interface IWalletTopupSuccessUseCase {
    execute(razorpayOrderId: string, razorpayPaymentId: string): Promise<void>;
};
