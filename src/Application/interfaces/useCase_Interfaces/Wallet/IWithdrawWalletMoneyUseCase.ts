import { Role } from "../../../../Infrastructure/Types/types";
import { withdrawWalletMoneyDTO } from "../../../Dto/Wallet/Wallet.dto";

export interface IWithdrawWalletMoneyUseCase {
    execute(owner: Role, ownerId: string, amount: number):Promise<withdrawWalletMoneyDTO>
}