import type { Request } from "express";
import { HubWorkersTemp } from "../../../../Domain/Entities/Worker/WrokersTemp";

export interface IAddWorkerTempUseCase {
    execute(req: Request): Promise<HubWorkersTemp>;
};