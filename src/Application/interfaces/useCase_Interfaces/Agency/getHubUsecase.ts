import { Hub } from "../../../../Domain/Entities/Hub/Hub";

export interface IGetHubUseCase{
    execute(agencyId:string):Promise<Hub[] | void>
}