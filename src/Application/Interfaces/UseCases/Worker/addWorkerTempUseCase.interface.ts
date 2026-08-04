import { AddWorkerTempRequestDTO, AddWorkerTempResponseDTO } from "../../../DTOs/Hub/hub.dto";

export interface IAddWorkerTempUseCase {
    execute(hubId:string,dto:AddWorkerTempRequestDTO): Promise<AddWorkerTempResponseDTO>;
};