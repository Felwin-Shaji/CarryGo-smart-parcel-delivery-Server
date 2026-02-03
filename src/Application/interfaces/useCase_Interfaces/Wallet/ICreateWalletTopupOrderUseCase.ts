import { CreateWalletTopupOrderDTO } from "../../../Dto/Wallet/Wallet.dto";

export interface ICreateWalletTopupOrderUseCase {
    execute(ownerId: string, amount: number): Promise<CreateWalletTopupOrderDTO>;
}
