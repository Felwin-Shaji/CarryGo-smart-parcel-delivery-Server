import { FilterQuery, ClientSession, Types, UpdateQuery } from "mongoose";
import { IAgencyRouteGroupRepository } from "../../../Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteGroupRepository";
import { RouteGroup } from "../../../Domain/Entities/Logistics/RouteGroup";
import { RouteGroupModel, RouteGroupDocument } from "../../database/models/Logistics/RouteGroupModel";
import { RouteGroupPaginationRequestDTO } from "../../../Application/Dto/Agency/agencyRouteGroup.dto";

export class AgencyRouteGroupRepository implements IAgencyRouteGroupRepository {

    /**
     * Generic find method
     * Used for querying route groups with flexible filters
     */
    async find(filter: FilterQuery<RouteGroup>, session?: ClientSession): Promise<RouteGroup[]> {

        const docs = await RouteGroupModel
            .find(filter)
            .session(session || null);

        return docs.map((doc) => AgencyRouteGroupRepository.toDomain(doc));
    }

    /**
     * Find a route group by id or any filter condition
     */
    async findById(filter: FilterQuery<RouteGroup>, session?: ClientSession): Promise<RouteGroup | null> {

        const doc = await RouteGroupModel
            .findOne(filter)
            .session(session || null);

        return doc ? AgencyRouteGroupRepository.toDomain(doc) : null;
    }

    /**
     * Find a single route group by filter
     */
    async findOne(filter: FilterQuery<RouteGroup>, session?: ClientSession): Promise<RouteGroup | null> {

        const doc = await RouteGroupModel
            .findOne(filter)
            .session(session || null);

        return doc ? AgencyRouteGroupRepository.toDomain(doc) : null;
    }

    /**
     * Get all route groups belonging to a specific agency
     */
    async getRouteGroupsByAgency(agencyId: string, session?: ClientSession): Promise<RouteGroup[]> {

        const docs = await RouteGroupModel
            .find({
                agencyId: new Types.ObjectId(agencyId),
            })
            .session(session || null);

        return docs.map((doc) => AgencyRouteGroupRepository.toDomain(doc));
    };


    /** 
     * Retrieve a paginated list of route groups for a specific agency.
     */
    async getPaginated(
        agencyId: string,
        options: RouteGroupPaginationRequestDTO,
        session?: ClientSession
    ): Promise<{ data: RouteGroup[]; total: number }> {


        const query: FilterQuery<RouteGroupDocument> = {
            agencyId: new Types.ObjectId(agencyId),
        };

        const { limit, page, filters = {} } = options;

        if (filters.isActive !== undefined) {
            query.isActive = filters.isActive;
        }

        if (filters.search?.trim()) {
            query.$or = [
                { name: { $regex: filters.search.trim(), $options: "i" } },
                { description: { $regex: filters.search.trim(), $options: "i" } },
            ];
        }

        const skip = (page - 1) * limit;

        const [docs, total] = await Promise.all([
            RouteGroupModel
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .session(session || null),

            RouteGroupModel
                .countDocuments(query)
                .session(session || null),
        ]);

        return {
            data: docs.map(AgencyRouteGroupRepository.toDomain),
            total,
        };
    }



    /**
     * Create and persist a new route group
     */
    async save(data: RouteGroup, session?: ClientSession): Promise<RouteGroup> {

        const createdDocs = await RouteGroupModel.create(
            [
                {
                    agencyId: new Types.ObjectId(data.agencyId),
                    name: data.name,
                    description: data.description,
                    isActive: data.isActive,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                },
            ],
            { session }
        );

        const created = createdDocs[0];

        if (!created) {
            throw new Error("Failed to create RouteGroup");
        }

        return AgencyRouteGroupRepository.toDomain(created);
    }

    /**
     * Find a route group and update its fields
     */
    async findOneAndUpdate(
        filter: FilterQuery<RouteGroup>,
        value: object,
        unset?: object,
        session?: ClientSession
    ): Promise<RouteGroup | null> {

        const updateQuery: UpdateQuery<RouteGroupDocument> = { $set: value };

        if (unset) {
            updateQuery.$unset = unset;
        }

        const doc = await RouteGroupModel
            .findOneAndUpdate(
                filter,
                updateQuery,
                { new: true }
            )
            .session(session || null);

        return doc ? AgencyRouteGroupRepository.toDomain(doc) : null;
    }

    /**
     * Delete a route group by filter
     */
    async delete(filter: FilterQuery<RouteGroup>, session?: ClientSession): Promise<RouteGroup | null> {

        const doc = await RouteGroupModel
            .findOneAndDelete(filter)
            .session(session || null);

        return doc ? AgencyRouteGroupRepository.toDomain(doc) : null;
    }

    /**
     * Convert MongoDB document into Domain Entity
     * Keeps domain layer independent from database layer
     */
    private static toDomain(doc: RouteGroupDocument): RouteGroup {

        return new RouteGroup(
            doc._id.toString(),
            doc.agencyId.toString(),
            doc.name,
            doc.description,
            doc.isActive,
            doc.createdAt,
            doc.updatedAt
        );
    }
}