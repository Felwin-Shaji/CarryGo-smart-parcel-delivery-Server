
import { BaseRepository } from "./baseRepositories";
import type { Admin } from "../../Domain/Entities/admin";
import { AdminModel } from "../database/models/Admin/adminModel";
import type { IAdminRepository } from "../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository";

export class AdminRepository extends BaseRepository<Admin> implements IAdminRepository{
    constructor() {
        super(AdminModel)
    }
}