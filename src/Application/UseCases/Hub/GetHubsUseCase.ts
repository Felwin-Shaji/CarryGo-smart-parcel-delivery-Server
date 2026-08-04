import { inject, injectable } from "tsyringe";
import { GetHubsDTO, GetHubsResponseDTO } from "../../DTOs/Hub/hub.dto";
import { IGetHubsUsecase } from "../../Interfaces/UseCases/Hub/IGetHubsUsecase";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/hub.repository";

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