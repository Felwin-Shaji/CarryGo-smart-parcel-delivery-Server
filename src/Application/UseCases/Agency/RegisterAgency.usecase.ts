import { inject, injectable } from "tsyringe";
import type { IRegisterAgencyUseCase } from "../../Interfaces/UseCases/Agency/Agencyregisrtation.usecase";
import type { IAgencyRepository } from "../../Interfaces/Repositories/Agency/agency.repository";
import { Agency } from "../../../Domain/Entities/Agency/Agency";
import { RegisterAgencyDTO, RegisterAgencyResponseDTO } from "../../DTOs/Agency/AgencyDTO";



@injectable()
export class RegisterAgencyUseCase  implements IRegisterAgencyUseCase {
    constructor(
        @inject("IAgencyRepository") private _agencyRepo:IAgencyRepository
    ){}

    async execute(agencyData: RegisterAgencyDTO): Promise<RegisterAgencyResponseDTO> {
        
        const newAgency = new Agency(
            null,
            agencyData.name,
            agencyData.email,
            agencyData.mobile || null,
            agencyData.password || null,
            agencyData.role
        )

        const savedData = await this._agencyRepo.save(newAgency);

        return savedData as RegisterAgencyResponseDTO;
    };
};