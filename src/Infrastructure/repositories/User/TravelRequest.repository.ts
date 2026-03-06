import { ServiceableTravelerDTO } from "../../../Application/Dto/User/Booking.dto";
import { ITravelRequestRepository } from "../../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { GeoLocation } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";
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

    async findServiceableTravelers(
  pickupLocation: GeoLocation,
  deliveryLocation: GeoLocation
): Promise<ServiceableTravelerDTO[]> {

  const MAX_DISTANCE = 20000; // 20km in meters
  const now = new Date();

  const result = await TravelRequestModel.aggregate([

    // 1️⃣ Find travel requests near pickup
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [pickupLocation.lng, pickupLocation.lat],
        },
        distanceField: "pickupDistance",
        maxDistance: MAX_DISTANCE,
        spherical: true,
        key: "startLocation"
      }
    },

    // 2️⃣ Filter end location manually
    {
      $match: {
        endLocation: {
          $geoWithin: {
            $centerSphere: [
              [deliveryLocation.lng, deliveryLocation.lat],
              MAX_DISTANCE / 6378137 // convert meters → radians
            ]
          }
        },
        status: { $in: ["ACTIVE", "PARTIALLY_BOOKED", "DRAFT"] },
        remainingCapacityKg: { $gt: 0 },
        departureAt: { $gt: now }
      }
    },

    // 3️⃣ Lookup traveler user
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

    // 4️⃣ Final projection
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
          modeOfTransport: "$modeOfTransport",

          startLocation: {
            lat: { $arrayElemAt: ["$startLocation.coordinates", 1] },
            lng: { $arrayElemAt: ["$startLocation.coordinates", 0] }
          },

          endLocation: {
            lat: { $arrayElemAt: ["$endLocation.coordinates", 1] },
            lng: { $arrayElemAt: ["$endLocation.coordinates", 0] }
          }
        }
      }
    }

  ]);

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

        {
            lat: doc.startLocation.coordinates[1],
            lng: doc.startLocation.coordinates[0],
        },
        doc.startAddress,
        doc.startPincode,

        {
            lat: doc.endLocation.coordinates[1],
            lng: doc.endLocation.coordinates[0],
        },
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
