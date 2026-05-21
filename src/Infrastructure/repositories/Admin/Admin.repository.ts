import { IAdminRepository } from "../../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminRepository";
import { Admin } from "../../../Domain/Entities/admin";
import { AdminModel } from "../../database/models/Admin/adminModel";
import { BaseRepository } from "../baseRepositories";

export class AdminRepository extends BaseRepository<Admin> implements IAdminRepository {
    constructor() {
        super(AdminModel)
    };
}