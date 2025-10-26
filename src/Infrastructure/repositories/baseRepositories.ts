import mongoose from "mongoose";
import type { ClientSession, FilterQuery, Model } from "mongoose";
import type { IBaseRepository } from "../../Application/interfaces/repositories/base.repository.js";

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
        return query;
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

    async findOneAndUpdate(filter: FilterQuery<T>, value: object, session: ClientSession): Promise<object | null> {
        const options: {
            new: boolean;
            session?: ClientSession;
        } = { new: true };

        if (session) options.session = session;
        const query = this.model.findOneAndUpdate(filter, { $set: value });
        return query;
    }

};