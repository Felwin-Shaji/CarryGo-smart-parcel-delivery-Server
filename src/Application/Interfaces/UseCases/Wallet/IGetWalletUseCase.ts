import { Role } from "../../../../Infrastructure/Types/CommonTypes";
import { GetWalletResponseDTO } from "../../../DTOs/Wallet/WalletDTO";



export interface IGetWalletUseCase {
    execute(ownerId: string, ownerType: Role): Promise<GetWalletResponseDTO>;
}
