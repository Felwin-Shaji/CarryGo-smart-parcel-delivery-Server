import { IAgencyRouteSegmentRepository } from "../../../Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { RouteSegment } from "../../../Domain/Entities/Logistics/RouteSegment";
import { AppError } from "../../../Domain/utils/customError";
import { ClientSession, FilterQuery, Types, UpdateQuery } from "mongoose";
import { RouteSegmentDocument, RouteSegmentModel } from "../../database/models/Logistics/RouteSegmentModel";
import { ROUTE_SEGMENT_MESSAGE } from "../../constants/messages/RouteGroupMessage";

export class AgencyRouteSegmentRepository implements IAgencyRouteSegmentRepository {

    /**
     * Find all route segments matching the given filter.
     * Typically called with { routeGroupId } to get all segments in a group.
     */
    async find(filter: FilterQuery<RouteSegment>, session?: ClientSession): Promise<RouteSegment[]> {

        const docs = await RouteSegmentModel
            .find(filter)
            .sort({ segmentOrder: 1 })
            .session(session ?? null);

        return docs.map(AgencyRouteSegmentRepository.toDomain);
    };

    /**
     * Find a single segment by a filter condition — usually { _id }.
     */
    async findById(filter: FilterQuery<RouteSegment>, session?: ClientSession): Promise<RouteSegment | null> {

        const doc = await RouteSegmentModel
            .findOne(filter)
            .session(session ?? null);

        return doc ? AgencyRouteSegmentRepository.toDomain(doc) : null;
    };


    /**
     * Find a single segment matching an arbitrary filter.
     */
    async findOne(filter: FilterQuery<RouteSegment>, session?: ClientSession): Promise<RouteSegment | null> {

        const doc = await RouteSegmentModel
            .findOne(filter)
            .session(session ?? null);

        return doc ? AgencyRouteSegmentRepository.toDomain(doc) : null;
    }

    /**
     * Persist a new route segment document.
     */
    async save(data: RouteSegment, session?: ClientSession): Promise<RouteSegment> {

        const createdDocs = await RouteSegmentModel.create(
            [
                {
                    agencyId: new Types.ObjectId(data.agencyId),
                    routeGroupId: new Types.ObjectId(data.routeGroupId),
                    originHubId: new Types.ObjectId(data.originHubId),
                    destinationHubId: new Types.ObjectId(data.destinationHubId),
                    segmentOrder: data.segmentOrder,
                    estimatedTimeMinutes: data.estimatedTimeMinutes,
                    distanceKm: data.distanceKm,
                    isActive: data.isActive,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                },
            ],
            { session }
        );

        const created = createdDocs[0];

        if (!created) {
            throw new AppError(ROUTE_SEGMENT_MESSAGE.CREATION_FAILED);
        }

        return AgencyRouteSegmentRepository.toDomain(created);
    }

    /**
     * Find a segment and update specified fields.
     * Pass an unset object to remove fields.
     */
    async findOneAndUpdate(
        filter: FilterQuery<RouteSegment>,
        value: object,
        unset?: object,
        session?: ClientSession
    ): Promise<RouteSegment | null> {

        const updateQuery: UpdateQuery<RouteSegmentDocument> = { $set: value };

        if (unset) updateQuery.$unset = unset;

        const doc = await RouteSegmentModel
            .findOneAndUpdate(filter, updateQuery, { new: true })
            .session(session ?? null);

        return doc ? AgencyRouteSegmentRepository.toDomain(doc) : null;
    }

    /**
     * Delete a segment by filter and return the deleted document.
     */
    async delete(filter: FilterQuery<RouteSegment>, session?: ClientSession): Promise<RouteSegment | null> {

        const doc = await RouteSegmentModel
            .findOneAndDelete(filter)
            .session(session ?? null);

        return doc ? AgencyRouteSegmentRepository.toDomain(doc) : null;
    }

    /**
     * Returns the highest segmentOrder value within a route group.
     * Returns 0 if no segments exist yet — caller does maxOrder + 1.
     */
    async getMaxOrder(routeGroupId: string, session?: ClientSession): Promise<number> {

        const doc = await RouteSegmentModel
            .findOne({ routeGroupId: new Types.ObjectId(routeGroupId) })
            .sort({ segmentOrder: -1 })
            .select("segmentOrder")
            .session(session ?? null);

        return doc?.segmentOrder ?? 0;
    }

    async findByIds(ids: string[], session?: ClientSession): Promise<RouteSegment[]> {
        if (!ids || ids.length === 0) return [];
        const objectIds = ids.map(id => new Types.ObjectId(id));

        const docs = await RouteSegmentModel
            .find({ _id: { $in: objectIds } })
            .session(session ?? null);

        return docs.map(AgencyRouteSegmentRepository.toDomain);
    }


    /**
     * Map a Mongoose document to the pure domain entity.
     * Keeps the domain layer free of any Mongoose types.
     */
    private static toDomain(doc: RouteSegmentDocument): RouteSegment {
        return new RouteSegment(
            doc._id.toString(),
            doc.agencyId.toString(),
            doc.routeGroupId.toString(),
            doc.originHubId.toString(),
            doc.destinationHubId.toString(),
            doc.segmentOrder,
            doc.estimatedTimeMinutes ?? null,
            doc.distanceKm ?? null,
            doc.isActive,
            doc.createdAt,
            doc.updatedAt
        );
    }

}