import { GetHubWorkersResponseDTO, GetWorkersDTO } from "../../../DTOs/Worker/worker.dto";

export interface IGetWorkersUseCase {
    execute(hubId: string, dto: GetWorkersDTO): Promise<GetHubWorkersResponseDTO>
};