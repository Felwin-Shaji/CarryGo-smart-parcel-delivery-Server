import { RepositoryRegistry } from "./repository.register";
import { ServiceRegistory } from "./service.register";
import { UsecaseRegistery } from "./usecase.register";

export class DependancyInjection {
    static registerAll(): void {
        RepositoryRegistry.registerRepositories();
        UsecaseRegistery.registerUsecase();
        ServiceRegistory.registerServices();
    }
}