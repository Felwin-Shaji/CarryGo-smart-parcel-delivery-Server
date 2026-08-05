import { IAdminRepository } from "../../../Application/Interfaces/Repositories/Admin/IAdminRepository";
import { Admin } from "../../../Domain/Entities/Admin";
import { AdminModel } from "../../Database/Models/Admin/AdminModel";
import { BaseRepository } from "../BaseRepository";

export class AdminRepository extends BaseRepository<Admin> implements IAdminRepository {
    constructor() {
        super(AdminModel)
    };
}