import { inject, injectable } from "tsyringe";
import { Role } from "../../../Infrastructure/Types/types";
import { GetWalletResponseDTO } from "../../DTOs/Wallet/WalletDTO";
import { IGetWalletUseCase } from "../../Interfaces/UseCases/Wallet/IGetWalletUseCase";
import { IWalletRepository } from "../../Interfaces/Repositories/Wallet/IWalletRepository";
import { WalletMapper } from "../../Mappers/Wallet/WalletMapper";

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