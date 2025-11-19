import { Types } from "mongoose";
import type { AgencyWithKYCDTO, IAgencyRepository, PaginatedData } from "../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository.js";
import { Agency } from "../../Domain/Entities/Agency/Agency.js";
import { AgencyModel } from "../database/models/AgencyModels/agencyModel.js";
import { BaseRepository } from "./baseRepositories.js";
import { AgencyKYC } from "../../Domain/Entities/Agency/AgencyKYC.js";

export class AgencyRepository extends BaseRepository<Agency> implements IAgencyRepository {
    constructor() {
        super(AgencyModel);
    };

    async getAgencies(): Promise<Agency[]> {
        return this.find({});
    }

    async getPaginatedAgencies(page: number, limit: number, search: string, sortBy: string, sortOrder: "asc" | "desc"): Promise<PaginatedData> {
        const skip = (page - 1) * limit;

        const filter = search
            ? {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { mobile: { $regex: search, $options: "i" } },
                ],
            }
            : {};

        const sort: any = {};
        if (sortBy) sort[sortBy] = sortOrder === "asc" ? 1 : -1;

        const [data, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(limit),
            this.model.countDocuments(filter),
        ]);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findAgencyWithKYC(id: string): Promise<AgencyWithKYCDTO | null> {
        const result = await this.model.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "agencykycs",
                    localField: "_id",
                    foreignField: "agencyId",
                    as: "kyc"
                }
            },
            { $unwind: { path: "$kyc", preserveNullAndEmptyArrays: true } }
        ])

        if (!result || result?.length === 0) return null;

        console.log(result,"Agencyrepositoryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")

        const agencyDoc = result[0];


        const agency = new Agency(
            agencyDoc._id.toString(),
            agencyDoc.name,
            agencyDoc.email,
            agencyDoc.mobile,
            agencyDoc.password,
            agencyDoc.role,
            agencyDoc.kycStatus,
            agencyDoc.walletBalance,
            agencyDoc.commisionRate,
            agencyDoc.isBlocked,
            agencyDoc.createdAt,
            agencyDoc.updatedAt
        );

           const kyc: AgencyKYC | null = agencyDoc.kyc
        ? {
              id: agencyDoc.kyc._id.toString(),
              agencyId: agencyDoc.kyc.agencyId.toString(),
              tradeLicenseNumber: agencyDoc.kyc.tradeLicenseNumber,
              tradeLicenseDocument: agencyDoc.kyc.tradeLicenseDocument,
              PANnumber: agencyDoc.kyc.PANnumber,
              PAN_photo: agencyDoc.kyc.PAN_photo,
              gst_number: agencyDoc.kyc.gst_number,
              gst_certificate: agencyDoc.kyc.gst_certificate,
              status: agencyDoc.kyc.status,
              createdAt: agencyDoc.kyc.createdAt,
              updatedAt: agencyDoc.kyc.updatedAt
          }
        : null;

        return { agency, kyc };


    }


};