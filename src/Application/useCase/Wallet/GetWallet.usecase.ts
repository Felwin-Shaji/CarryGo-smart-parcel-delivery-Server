import { inject, injectable } from "tsyringe";
import { Role } from "../../../Infrastructure/Types/types";
import { GetWalletResponseDTO } from "../../Dto/Wallet/Wallet.dto";
import { IGetWalletUseCase } from "../../interfaces/useCase_Interfaces/Wallet/IGetWalletUseCase";
import { IWalletRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { WalletMapper } from "../../Mappers/Wallet/walletMapper";

@injectable()
export class GetWalletUseCase implements IGetWalletUseCase {
    constructor(
        @inject("IWalletRepository") private _walletRepo: IWalletRepository,
    ) { }
    async execute(ownerId: string, ownerType: Role): Promise<GetWalletResponseDTO> {
        let wallet = await this._walletRepo.findByOwner(ownerType, ownerId);

        if (!wallet) {
            wallet = WalletMapper.toCreateWallet(ownerId, ownerType);
            await this._walletRepo.create(wallet);
        }

        return WalletMapper.toGetWalletResponse(wallet);

    }
}