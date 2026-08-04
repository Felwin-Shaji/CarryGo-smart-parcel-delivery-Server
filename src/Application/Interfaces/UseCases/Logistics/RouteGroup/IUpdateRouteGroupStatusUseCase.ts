export interface IUpdateRouteGroupStatusUseCase {
    execute(routeGroupId: string, agencyId: string, isActive: boolean): Promise<void>
}