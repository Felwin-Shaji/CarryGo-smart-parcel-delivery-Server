// import { inject, injectable } from "tsyringe";
// import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
// import { Agency } from "../../../Domain/Entities/Agency/Agency";

// @injectable()
// export class UpdateAgencyKycStatusUseCase {
//   constructor(
//     @inject("IAgencyRepository") private agencyRepo: IAgencyRepository
//   ) {}
 
//   async execute(agencyId: string):Promise<Agency | null> {
//     return await this.agencyRepo.findOneAndUpdate(
//       { _id: agencyId },
//       { kycStatus: "REGISTERED" }
//     );
//   }
// }
