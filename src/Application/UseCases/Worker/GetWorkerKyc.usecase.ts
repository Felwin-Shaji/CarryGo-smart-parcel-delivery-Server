import { inject, injectable } from "tsyringe";
import { IHubWorkerKycRepository } from "../../Interfaces/Repositories/Worker/wrokerKyc.repository";
import { IGetWorkerKycUseCase } from "../../Interfaces/UseCases/Worker/IGetWorkerKycUseCase";
import { GetWorkerKycResponseDTO } from "../../DTOs/Worker/WorkerDTO";

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