import { Role } from "../../../../Infrastructure/Types/types";
import { GetWalletResponseDTO } from "../../../Dto/Wallet/Wallet.dto";



export interface IGetWalletUseCase {
    execute(ownerId: string, ownerType: Role): Promise<GetWalletResponseDTO>;
}
