import type { Request } from "express";
import { HubWorkersTemp } from "../../../../Domain/Entities/Worker/WrokersTemp";
import { AddWorkerTempRequestDTO, AddWorkerTempResponseDTO } from "../../../Dto/Hub/hub.dto";

export interface IAddWorkerTempUseCase {
    execute(hubId:string,dto:AddWorkerTempRequestDTO): Promise<AddWorkerTempResponseDTO>;
};