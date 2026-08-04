import { Role } from "../../../../Infrastructure/Types/types";
import { GetWalletResponseDTO } from "../../../DTOs/Wallet/WalletDTO";



export interface IGetWalletUseCase {
    execute(ownerId: string, ownerType: Role): Promise<GetWalletResponseDTO>;
}
