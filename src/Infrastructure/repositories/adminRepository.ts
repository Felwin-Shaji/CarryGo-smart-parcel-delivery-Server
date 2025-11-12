
import { BaseRepository } from "./baseRepositories.js";

import type { Admin } from "../../Domain/Entities/admin.js";
import { AdminModel } from "../database/models/adminModel.js";

export class AdminRepository<T> extends BaseRepository<Admin> {
    constructor() {
        super(AdminModel)
    }
}