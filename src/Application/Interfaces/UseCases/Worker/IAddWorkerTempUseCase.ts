import { AddWorkerTempRequestDTO, AddWorkerTempResponseDTO } from "../../../DTOs/Hub/HubDTO";

export interface IAddWorkerTempUseCase {
    execute(hubId:string,dto:AddWorkerTempRequestDTO): Promise<AddWorkerTempResponseDTO>;
};