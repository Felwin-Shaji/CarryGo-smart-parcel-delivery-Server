import { RepositoryRegistry } from "./RepositoryRegistry";
import { ServiceRegistory } from "./ServiceRegistry";
import { UsecaseRegistery } from "./UseCaseRegistry";

export class DependancyInjection {
    static registerAll(): void {
        RepositoryRegistry.registerRepositories();
        UsecaseRegistery.registerUsecase();
        ServiceRegistory.registerServices();
    }
}