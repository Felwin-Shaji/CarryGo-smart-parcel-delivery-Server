import { inject, injectable } from "tsyringe";
import { GetHubsDTO, GetHubsResponseDTO } from "../../Dto/Hub/hub.dto";
import { IGetHubsUsecase } from "../../interfaces/useCase_Interfaces/Hub/IGetHubsUsecase";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";

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