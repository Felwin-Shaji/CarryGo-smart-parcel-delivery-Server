import { ICounterRepository } from "@/Application/interfaces/repositories_interfaces/ICounterRepository";
import { Counter } from "../database/counterSchema";

export class CounterRepository implements ICounterRepository {

    async increment(key: string): Promise<number> {
        const counter = await Counter.findOneAndUpdate(
            { key },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        return counter.seq;
    };
};
