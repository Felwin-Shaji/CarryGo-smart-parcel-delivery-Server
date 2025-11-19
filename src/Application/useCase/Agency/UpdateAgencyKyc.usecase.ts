import { inject, injectable } from "tsyringe";
import { Agency } from "../../../Domain/Entities/Agency/Agency";
import { KYCStatus } from "../../../Infrastructure/Types/types";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IUpdateAgencyKycStatusUseCase } from "../../interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase";

@injectable()
export class UpdateAgencyKycStatusUseCase implements IUpdateAgencyKycStatusUseCase {
    constructor(
        @inject("IAgencyRepository")
        private agencyRepo: IAgencyRepository,
    ) { };
    async execute(agencyId: string, status: KYCStatus): Promise<Agency | null> {
        const result = await this.agencyRepo.findOneAndUpdate(
            { _id: agencyId },
            { kycStatus: status }
        );

        return result;
    };
};