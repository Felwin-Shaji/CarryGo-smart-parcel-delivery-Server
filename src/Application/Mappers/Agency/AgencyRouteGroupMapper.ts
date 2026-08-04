import { RouteGroup } from "../../../Domain/Entities/Logistics/RouteGroup";
import { CreateRouteGroupRequestDTO } from "../../DTOs/Agency/agencyRouteGroup.dto";

export class AgencyRouteGroupMapper {
    static toCreate(agencyId: string, data: CreateRouteGroupRequestDTO): RouteGroup {
        return new RouteGroup(
            null,
            agencyId,
            data.name.trim(),
            data.description?.trim() ?? null,
            data.isActive ?? true
        );
    }
}