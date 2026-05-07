import { ClientSession, FilterQuery } from "mongoose";
import { Hub } from "../../../../Domain/Entities/Hub/Hub";
import { HubDocument } from "../../../../Infrastructure/database/models/Hub/HubModel";
import { GetHubsDTO, updateHubKycStatusDTO } from "../../../Dto/Hub/hub.dto";
import { ServiceableHubWithAgencyDTO } from "../../../Dto/User/Booking.dto";
import { IBaseRepository } from "../base.repository";
import { GeoLocation } from "../../useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";

export interface PaginatedHubData {
  data: Hub[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IHubRepository {
  findById(filter: FilterQuery<HubDocument>): Promise<Hub>
  findOne(filter: FilterQuery<HubDocument>): Promise<Hub>
  findOneAndUpdate(filter: FilterQuery<HubDocument>, value: object, unsetData?: object, session?: ClientSession): Promise<Hub | null>
  saveHub(hub: Hub): Promise<Hub>
  getHubById(hubId: string): Promise<Hub>;
  findByIds(hubIds: string[]): Promise<Hub[]>;
  updateKycSatus(hubId: string, dto: updateHubKycStatusDTO): Promise<void>;
  getPaginatedHubsByAgency(agencyId: string, dto: GetHubsDTO): Promise<PaginatedHubData>;
  findServiceableAgenciesWithHubs(pickupLocation: GeoLocation,
    deliveryLocation: GeoLocation,
  ): Promise<ServiceableHubWithAgencyDTO[]>;
  countByAgency(agencyId: string): Promise<number>;
  countWorkersByAgency(agencyId: string): Promise<number>;
}