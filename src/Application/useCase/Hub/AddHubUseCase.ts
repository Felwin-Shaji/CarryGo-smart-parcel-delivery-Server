import { inject, injectable } from "tsyringe";
import { AddHubDTO } from "../../Dto/Agency/agency.dto";
import { IAddHubUseCase } from "../../interfaces/useCase_Interfaces/Hub/IAddHubUseCase";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { Hub } from "../../../Domain/Entities/Hub/Hub";
import { Types } from "mongoose";

@injectable()
export class AddHubUsecase implements IAddHubUseCase {
    constructor(

        @inject("IHubRepository") private _hubRepo: IHubRepository
    ) { }

    async execute(dto: AddHubDTO, uploadedFiles: any): Promise<Hub> {

        const hudData: Hub = {
            agencyId: new Types.ObjectId(dto.agencyId),
            name: dto.name,
            address: {
                addressLine1: dto.addressLine1,
                city: dto.city,
                state: dto.state,
                pincode: dto.pincode,
            },
            location: {
                lat: dto.location_lat,
                lng: dto.location_lng
            },
            verificationImage: uploadedFiles,
            status: "PENDING"
        }

        const savedHub = await this._hubRepo.save(hudData)

        return savedHub
    }
}