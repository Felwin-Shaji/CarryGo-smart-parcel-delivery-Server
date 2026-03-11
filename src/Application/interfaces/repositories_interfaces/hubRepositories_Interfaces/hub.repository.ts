import { FilterQuery } from "mongoose";
import { Hub } from "../../../../Domain/Entities/Hub/Hub";
import { HubDocument } from "../../../../Infrastructure/database/models/Hub/HubModel";
import { GetHubsDTO, updateHubKycStatusDTO } from "../../../Dto/Hub/hub.dto";
import { PaginationResponseDTO, ServiceableHubWithAgencyDTO } from "../../../Dto/User/Booking.dto";
import { IBaseRepository } from "../base.repository";
import { GeoLocation } from "../../useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";
export interface PaginatedHubData {
  data: Hub[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IHubRepository extends IBaseRepository<HubDocument> {
  findOneHub(filter: FilterQuery<HubDocument>): Promise<Hub>
  saveHub(hub: Hub): Promise<Hub>
  getHubById(hubId: string): Promise<Hub>;
  updateKycSatus(hubId: string, dto: updateHubKycStatusDTO): Promise<void>;
  getPaginatedHubsByAgency(agencyId: string, dto: GetHubsDTO): Promise<PaginatedHubData>;
  findServiceableAgenciesWithHubs(pickupLocation: GeoLocation,
    deliveryLocation: GeoLocation,
    page: number,
    limit: number
  ): Promise<PaginationResponseDTO<ServiceableHubWithAgencyDTO>>
}