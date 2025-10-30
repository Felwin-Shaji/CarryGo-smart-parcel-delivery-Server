import { RepositoryRegistry } from "./repository.register.js";
import { UsecaseRegistery } from "./usecase.register.js";

export class DependancyInjection {
    static registerAll():void{
        RepositoryRegistry.registerRepositories();
        UsecaseRegistery.registerUsecase();
    }
}