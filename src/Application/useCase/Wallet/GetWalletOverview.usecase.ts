import { inject, injectable } from "tsyringe";
import { getWalletOverviewRequestDTO, GetWalletOverviewResponseDTO } from "../../Dto/Wallet/Wallet.dto";
import { IGetWalletOverviewUseCase } from "../../interfaces/useCase_Interfaces/Wallet/IGetWalletOverviewUseCase";
import { IWalletRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { ITransactionRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { WalletMapper } from "../../Mappers/Wallet/walletMapper";

@injectable()
export class GetWalletOverviewUseCase implements IGetWalletOverviewUseCase {

    constructor(
        @inject("IWalletRepository") private _walletRepo: IWalletRepository,
        @inject("ITransactionRepository") private _transactionRepo: ITransactionRepository
    ) { }

    async execute(dto: getWalletOverviewRequestDTO): Promise<GetWalletOverviewResponseDTO> {
        const { ownerId, ownerType, transactionLimit = 5 } = dto;


        let wallet = await this._walletRepo.findByOwner(ownerType, ownerId);

        if (!wallet) {
            wallet = WalletMapper.toCreateWallet(ownerId, ownerType);
            await this._walletRepo.create(wallet);
        }

        const transactions = await this._transactionRepo.findRecentByWallet(wallet.id!, transactionLimit);

        const res = WalletMapper.toGetWalletOverviewResponse(wallet, transactions);

        return res
    }
}