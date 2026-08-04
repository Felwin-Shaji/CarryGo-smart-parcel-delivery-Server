import { getWalletOverviewRequestDTO, GetWalletOverviewResponseDTO } from "../../../DTOs/Wallet/Wallet.dto";

export interface IGetWalletOverviewUseCase {
  execute(dto: getWalletOverviewRequestDTO): Promise<GetWalletOverviewResponseDTO>;
}