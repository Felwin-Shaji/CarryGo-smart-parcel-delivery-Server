import { CreateTravelRequestDTO } from "../../../../Dto/User/traveler.dto";

export interface ICreateTravelRequestUseCase {
    execute(travelerId: string, dto: CreateTravelRequestDTO): Promise<void>;
};
