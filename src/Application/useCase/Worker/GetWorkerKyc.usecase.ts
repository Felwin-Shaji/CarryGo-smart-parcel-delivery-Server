import { inject, injectable } from "tsyringe";
import { IHubWorkerKycRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { IGetWorkerKycUseCase } from "../../interfaces/useCase_Interfaces/Worker/IGetWorkerKycUseCase";
import { GetWorkerKycResponseDTO } from "../../Dto/Workers/worker.dto";

@injectable()
export class GetWorkerKycUseCase implements IGetWorkerKycUseCase {
  constructor(
    @inject("IHubWorkerKycRepository")
    private _kycRepo: IHubWorkerKycRepository
  ) {}

  async execute(workerId: string): Promise<GetWorkerKycResponseDTO | null>{
    const kyc = await this._kycRepo.getKycBySubjectId(workerId, "worker");

    if (!kyc) return null;

    return {
      idType: kyc.idType,
      idNumber: kyc.idNumberEncrypted, 
      documentUrl: kyc.documentUrl,
      selfieUrl: kyc.selfieUrl,
      rejectionReason: kyc.rejectionReason || null,
    };
  }
}