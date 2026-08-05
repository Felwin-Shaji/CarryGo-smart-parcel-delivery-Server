import { Role } from "../../../../Infrastructure/Types/CommonTypes";
import { CreateWalletTopupOrderDTO } from "../../../DTOs/Wallet/WalletDTO";

export interface ICreateWalletTopupOrderUseCase {
    execute(owner: Role, ownerId: string, amount: number): Promise<CreateWalletTopupOrderDTO>;
}
