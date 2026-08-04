import { GetHubWorkersResponseDTO, GetWorkersDTO } from "../../../DTOs/Worker/WorkerDTO";

export interface IGetWorkersUseCase {
    execute(hubId: string, dto: GetWorkersDTO): Promise<GetHubWorkersResponseDTO>
};