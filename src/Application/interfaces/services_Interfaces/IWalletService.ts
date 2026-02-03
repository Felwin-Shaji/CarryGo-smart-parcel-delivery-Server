export interface IWalletService {

    holdAmount(walletId: string, amount: number, orderId: string, gatewayReferenceId?: string): Promise<void>;

    releaseAmount(walletId: string, amount: number, reason: "SETTLEMENT" | "REFUND", orderId: string ): Promise<void>;

    credit(walletId: string, amount: number, reason: "COMMISSION" | "ADJUSTMENT", orderId?: string, metadata?: Record<string, any> ): Promise<void>;

    debit( walletId: string, amount: number, reason: "PAYOUT" | "ADJUSTMENT", metadata?: Record<string, any> ): Promise<void>;
}
