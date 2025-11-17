
import { BaseRepository } from "./baseRepositories.js";
import type { Admin } from "../../Domain/Entities/admin.js";
import { AdminModel } from "../database/models/Admin/adminModel.js";
import type { IAdminRepository } from "../../Application/interfaces/repositories/admin/admin.repository.js";

export class AdminRepository extends BaseRepository<Admin> implements IAdminRepository{
    constructor() {
        super(AdminModel)
    }
}