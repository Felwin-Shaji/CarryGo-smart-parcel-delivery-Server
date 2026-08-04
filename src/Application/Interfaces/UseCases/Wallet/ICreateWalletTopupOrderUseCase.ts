import { Role } from "../../../../Infrastructure/Types/types";
import { CreateWalletTopupOrderDTO } from "../../../DTOs/Wallet/Wallet.dto";

export interface ICreateWalletTopupOrderUseCase {
    execute(owner: Role, ownerId: string, amount: number): Promise<CreateWalletTopupOrderDTO>;
}
