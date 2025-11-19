import { inject, injectable } from "tsyringe";
import type { IRegisterAgencyUseCase } from "../../interfaces/useCase_Interfaces/Agency/Agencyregisrtation.usecase.js";
import type { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository.js";
import type { AgencyDTO } from "../../Dto/Auth/Auth.dto.js";
import { Agency } from "../../../Domain/Entities/Agency/Agency.js";

@injectable()
export class RegisterAgencyUseCase  implements IRegisterAgencyUseCase {
    constructor(
        @inject("IAgencyRepository") private agencyRepo:IAgencyRepository
    ){}

    async execute(agencyData: AgencyDTO): Promise<Agency> {
        
        const newAgency = new Agency(
            null,
            agencyData.name,
            agencyData.email,
            agencyData.mobile || null,
            agencyData.password || null,
            agencyData.role
        )

        const savedData = await this.agencyRepo.save(newAgency);

        return savedData;
    };
};