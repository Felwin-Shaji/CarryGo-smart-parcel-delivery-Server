import { inject, injectable } from 'tsyringe';
import { IHubRepository } from '../../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository';
import { CheckServiceableAgencyDTO, PaginationResponseDTO, ServiceableHubWithAgencyDTO } from '../../../Dto/User/Booking.dto';
import { IFindServicableAgencyUsecase } from '../../../interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase';

@injectable()
export class FindServicableAgencyUsecase implements IFindServicableAgencyUsecase {
    constructor(
        @inject("IHubRepository") private hubRepository: IHubRepository
    ) { }
    async execute(
        dto: CheckServiceableAgencyDTO
    ): Promise<PaginationResponseDTO<ServiceableHubWithAgencyDTO>> {
        const { pickupLocation, deliveryLocation, page = 1, limit = 5 } = dto;

        const agencies = await this.hubRepository.findServiceableAgenciesWithHubs(pickupLocation, deliveryLocation, page, limit);
        return agencies;
    }
}