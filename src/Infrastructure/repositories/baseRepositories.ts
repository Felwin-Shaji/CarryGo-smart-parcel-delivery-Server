import mongoose from "mongoose";
import type { ClientSession, FilterQuery, Model } from "mongoose";
import type { IBaseRepository } from "../../Application/interfaces/repositories_interfaces/base.repository.js";

export class BaseRepository<T> implements IBaseRepository<T> {

    constructor(protected model: Model<T>) { }

    async find(filter: FilterQuery<T>, session?: ClientSession): Promise<T[]> {
        const query = this.model.find(filter);
        if (session) query.session(session);
        return query;
    };

    async findById(filter: FilterQuery<T>, session?: ClientSession): Promise<T | null> {
        const query = this.model.findById(filter);
        if (session) query.session(session);
        return query;
    };

    async findOne(filter: mongoose.FilterQuery<T>, session?: ClientSession): Promise<T | null> {
        const query = this.model.findOne(filter);
        if (session) query.session(session);
        return  query;
    };

    async save(data: T, session?: ClientSession): Promise<T> {
        const document = new this.model(data);
        if (session) {
            await document.save({ session });
        } else {
            await document.save();
        };
        return document;
    };

    async delete(filter: FilterQuery<T>, session?: ClientSession): Promise<T | null> {
        const query = this.model.findOneAndDelete(filter);
        if (session) query.session(session);
        return query;
    }

    async findOneAndUpdate(filter: FilterQuery<T>, value: object, unsetData?: object, session?: ClientSession): Promise<T | null> {
        const options: {
            new: boolean;
            session?: ClientSession;
        } = { new: true };

        const update: {
            $set: object;
            $unset?: object;
        } = { $set: value };

        if (unsetData) {
            const cleanedUnset: Record<string, string> = {};

            for (const key in unsetData) {
                cleanedUnset[key] = "";
            }

            update.$unset = cleanedUnset;
        }


        if (session) options.session = session;

        return this.model.findOneAndUpdate(filter, update, options);
    }


};