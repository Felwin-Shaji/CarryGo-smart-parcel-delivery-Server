import { getWalletOverviewRequestDTO, GetWalletOverviewResponseDTO } from "../../../DTOs/Wallet/WalletDTO";

export interface IGetWalletOverviewUseCase {
  execute(dto: getWalletOverviewRequestDTO): Promise<GetWalletOverviewResponseDTO>;
}