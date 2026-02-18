import { ServiceableTravelerDTO } from "../../../Application/Dto/User/Booking.dto";
import { ITravelRequestRepository } from "../../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { TravelRequest } from "../../../Domain/Entities/User/TravelRequest";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../constants/messages/userMessage";
import { STATUS } from "../../constants/statusCodes";
import { TravelRequestDocument, TravelRequestModel } from "../../database/models/UserModels/travelRequestSchema";
import { BaseRepository } from "../baseRepositories";


export class TravelRequestRepository extends BaseRepository<TravelRequestDocument> implements ITravelRequestRepository {
    constructor() {
        super(TravelRequestModel)
    };

    async create(travelRequest: TravelRequest): Promise<void> {
        const doc = {
            travelerId: travelRequest.travelerId,
            startLocation: travelRequest.startLocation,
            startAddress: travelRequest.startAddress,
            endLocation: travelRequest.endLocation,
            startPincode:travelRequest.startPincode,
            endAddress: travelRequest.endAddress,
            endPincode:travelRequest.endPincode,
            departureAt: travelRequest.departureAt,
            arrivalAt: travelRequest.arrivalAt,
            capacityKg: travelRequest.capacityKg,
            remainingCapacityKg: travelRequest.remainingCapacityKg,
            allowedPackageSizes: travelRequest.allowedPackageSizes,
            pricePerKg: travelRequest.pricePerKg,
            modeOfTransport: travelRequest.modeOfTransport,
            description: travelRequest.description,
            status: travelRequest.status,
        };

        await this.model.create(doc);
    };

    async findByTravelerId(travelerId: string): Promise<TravelRequest[]> {


        const docs = await this.model
            .find({ travelerId })
            .sort({ createdAt: -1 });

        return docs.map(doc => this.toDomain(doc))
    }

    async getTravelRequestById(travelRequestId: string): Promise<TravelRequest> {
        const doc = await this.model.findById({ _id: travelRequestId });
        if (!doc) throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_NOT_FOUND, STATUS.NOT_FOUND);
        return this.toDomain(doc);
    }

    async findServiceableTravelers(fromPincode: string,toPincode: string): Promise<ServiceableTravelerDTO[]> {

        const now = new Date();

        const result = await TravelRequestModel.aggregate([

            {
                $match: {
                    startPincode: fromPincode,
                    endPincode: toPincode,
                    status: { $in: ["ACTIVE", "PARTIALLY_BOOKED","DRAFT"] },
                    remainingCapacityKg: { $gt: 0 },
                    departureAt: { $gt: now }
                }
            },

            {
                $lookup: {
                    from: "users",
                    localField: "travelerId",
                    foreignField: "_id",
                    as: "traveler"
                }
            },

            { $unwind: "$traveler" },

            {
                $match: {
                    "traveler.isBlocked": false,
                    "traveler.kycStatus": "APPROVED"
                }
            },

            {
                $project: {

                    traveler: {
                        travelerId: { $toString: "$traveler._id" },
                        name: "$traveler.name",
                        email: "$traveler.email",
                        mobile: "$traveler.mobile"
                    },

                    travelRequest: {
                        travelRequestId: { $toString: "$_id" },
                        from: "$startAddress",
                        to: "$endAddress",
                        departureAt: "$departureAt",
                        arrivalAt: "$arrivalAt",
                        remainingCapacityKg: "$remainingCapacityKg",
                        pricePerKg: "$pricePerKg",
                        modeOfTransport: "$modeOfTransport"
                    }
                }
            }

        ]);

        console.log(result,"✅✅✅✅✅✅")

        return result;
    }

    async update(travelRequest: TravelRequest): Promise<void> {

    const result = await this.model.updateOne(
        { _id: travelRequest.id },
        {
            $set: {
                remainingCapacityKg: travelRequest.remainingCapacityKg,
                status: travelRequest.status,
                updatedAt: new Date(),
            }
        }
    );

    if (result.matchedCount === 0) {
        throw new AppError(
            USER_MESSAGES.TRAVEL_REQUEST_NOT_FOUND,
            STATUS.NOT_FOUND
        );
    }
}
 


    toDomain(doc: TravelRequestDocument): TravelRequest {
        return new TravelRequest(
            doc._id.toString(),
            doc.travelerId.toString(),
            doc.startLocation,
            doc.startAddress,
            doc.startPincode,
            doc.endLocation,
            doc.endAddress,
            doc.endPincode,
            doc.departureAt,
            doc.arrivalAt ?? null,
            doc.capacityKg,
            doc.remainingCapacityKg,
            doc.allowedPackageSizes,
            doc.pricePerKg ?? null,
            doc.modeOfTransport,
            doc.description ?? null,
            doc.status,
            doc.createdAt,
            doc.updatedAt
        );
    }
}
