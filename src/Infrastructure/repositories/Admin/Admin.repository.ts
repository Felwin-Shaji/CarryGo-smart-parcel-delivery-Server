import { IAdminRepository } from "../../../Application/Interfaces/Repositories/Admin/IAdminRepository";
import { Admin } from "../../../Domain/Entities/admin";
import { AdminModel } from "../../Database/Models/Admin/adminModel";
import { BaseRepository } from "../baseRepositories";

export class AdminRepository extends BaseRepository<Admin> implements IAdminRepository {
    constructor() {
        super(AdminModel)
    };
}