import { inject, injectable } from 'tsyringe';
import { IHubRepository } from '../../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository';
import { ServiceableHubWithAgencyDTO } from '../../../Dto/User/Booking.dto';
import { AppError } from '../../../../Domain/utils/customError';
import { BOOKING_MESSAGE } from '../../../../Infrastructure/constants/messages/bookingMessages';
import { IFindServicableAgencyUsecase } from '../../../interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase';

@injectable()
export class FindServicableAgencyUsecase implements IFindServicableAgencyUsecase {
    constructor(
        @inject("IHubRepository") private hubRepository: IHubRepository
    ) { }
    async execute(fromPincode: string, toPincode: string): Promise<ServiceableHubWithAgencyDTO[]> {
        const agencies = await this.hubRepository.findServiceableAgenciesWithHubs(fromPincode, toPincode);

        if (!agencies.length) {
            throw new AppError(BOOKING_MESSAGE.NO_SERVICEABLE_AGENCY_FOUND);
        };

        return agencies;
    }
}