import { Role } from "../../../../Infrastructure/Types/CommonTypes";
import { withdrawWalletMoneyDTO } from "../../../DTOs/Wallet/WalletDTO";

export interface IWithdrawWalletMoneyUseCase {
    execute(owner: Role, ownerId: string, amount: number):Promise<withdrawWalletMoneyDTO>
}