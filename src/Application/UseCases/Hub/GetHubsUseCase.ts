import { inject, injectable } from "tsyringe";
import { GetHubsDTO, GetHubsResponseDTO } from "../../DTOs/Hub/HubDTO";
import { IGetHubsUsecase } from "../../Interfaces/UseCases/Hub/IGetHubsUseCase";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";

@injectable()
export class GetHubsUsecase implements IGetHubsUsecase{
    constructor(
        @inject("IHubRepository") private _hubRepo:IHubRepository,
    ){}

    async execute(agencyId: string,dto: GetHubsDTO): Promise<GetHubsResponseDTO> {

        const hubs = await this._hubRepo.getPaginatedHubsByAgency(agencyId,dto);

        return hubs as unknown as GetHubsResponseDTO
    };
};