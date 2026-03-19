import { RouteGroup } from "../../../Domain/Entities/Logistics/RouteGroup"

export type CreateRouteGroupRequestDTO = {
    name: string
    description?: string
    isActive?: boolean
}

export type UpdateRouteGroupRequestDTO = {
    name?: string
    description?: string
    isActive?: boolean
}

export type RouteGroupFilterRequestDTO = {
    search?: string
    isActive?: boolean
}

export type RouteGroupPaginationRequestDTO = {
    page: number
    limit: number
    filters?: RouteGroupFilterRequestDTO
}

export type PaginatedRouteGroupResponseDTO = {
    data: RouteGroup[]
    total: number
    page: number
    limit: number
    totalPages: number
}