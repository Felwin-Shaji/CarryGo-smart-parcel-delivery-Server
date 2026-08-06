import { CreateTravelRequestDTO } from "../../../../DTOs/User/TravelerDTO";

export interface ICreateTravelRequestUseCase {
    execute(travelerId: string, dto: CreateTravelRequestDTO): Promise<void>;
};
