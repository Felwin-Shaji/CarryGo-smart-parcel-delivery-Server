import { Role } from "../../../../Infrastructure/Types/types";
import { CreateWalletTopupOrderDTO } from "../../../Dto/Wallet/Wallet.dto";

export interface ICreateWalletTopupOrderUseCase {
    execute(owner: Role, ownerId: string, amount: number): Promise<CreateWalletTopupOrderDTO>;
}
