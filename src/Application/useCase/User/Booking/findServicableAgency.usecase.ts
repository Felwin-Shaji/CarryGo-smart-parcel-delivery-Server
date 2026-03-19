import { inject, injectable } from 'tsyringe';
import { IHubRepository } from '../../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository';
import { CheckServiceableAgencyDTO, ServiceableHubWithAgencyDTO } from '../../../Dto/User/Booking.dto';
import { IFindServicableAgencyUsecase } from '../../../interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase';
import { IRouteComputationService } from '@/Application/interfaces/services_Interfaces/IRouteComputationService';

@injectable()
export class FindServicableAgencyUsecase implements IFindServicableAgencyUsecase {
    constructor(
        @inject("IHubRepository") private hubRepository: IHubRepository,
        @inject("IRouteComputationService") private _routeComputationService: IRouteComputationService
    ) { }
    async execute(
        dto: CheckServiceableAgencyDTO
    ): Promise<ServiceableHubWithAgencyDTO[]> {
        const { pickupLocation, deliveryLocation } = dto;
        const agencies = await this.hubRepository.findServiceableAgenciesWithHubs(pickupLocation, deliveryLocation);

        const checks = await Promise.all(
            agencies.map(async (item) => {
                const chain = await this._routeComputationService.computeSegmentChain(
                    item.fromHub.hubId,
                    item.toHub.hubId,
                    item.agency.agencyId
                )

                return { item, hasRoute: chain.length > 0 };
            })
        )

        const filtered = checks
            .filter((c) => c.hasRoute)
            .map((c) => c.item);

        return filtered

    }
}