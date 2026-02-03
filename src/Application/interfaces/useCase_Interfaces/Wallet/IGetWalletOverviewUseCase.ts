import { getWalletOverviewRequestDTO, GetWalletOverviewResponseDTO } from "../../../Dto/Wallet/Wallet.dto";

export interface IGetWalletOverviewUseCase {
  execute(dto: getWalletOverviewRequestDTO): Promise<GetWalletOverviewResponseDTO>;
}