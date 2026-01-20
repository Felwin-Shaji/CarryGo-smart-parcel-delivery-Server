import { GetHubWorkersResponseDTO, GetWorkersDTO } from "../../../Dto/Workers/worker.dto";

export interface IGetWorkersUseCase {
    execute(hubId: string, dto: GetWorkersDTO): Promise<GetHubWorkersResponseDTO>
};