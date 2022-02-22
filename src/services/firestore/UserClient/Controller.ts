import { CategoryRepository } from '@/services/firestore/Category/Repository';
import { ClientRepository } from '@/services/firestore/Client/Repository';
import { ClientProjectRepository } from '@/services/firestore/ClientProject/Repository';
import { ProjectRepository } from '@/services/firestore/Project/Repository';
import { ProjectCategoryRepository } from '@/services/firestore/ProjectCategory/Repository';
import { UserClientRepository } from '@/services/firestore/UserClient/Repository';
import {
  CategoryEntity,
  ClientEntity,
  ClientWithProjects,
  ClientWithProjectsWithCategories,
  ProjectEntity,
} from '@/types/firestore';

interface IUserClient {
  loadUserClients(userId: string): Promise<ClientWithProjectsWithCategories[]>;
}

/**
 * @controller UserClientController
 * */
class UserClientController implements IUserClient {
  private clientRepository: ClientRepository;
  private clientProjectRepository: ClientProjectRepository;
  private projectRepository: ProjectRepository;
  private projectCategoryRepository: ProjectCategoryRepository;
  private categoryRepository: CategoryRepository;
  private userUserClientRepository: UserClientRepository;

  /** Init repositories */
  constructor() {
    this.clientRepository = new ClientRepository();
    this.clientProjectRepository = new ClientProjectRepository();
    this.projectRepository = new ProjectRepository();
    this.projectCategoryRepository = new ProjectCategoryRepository();
    this.categoryRepository = new CategoryRepository();

    this.userUserClientRepository = new UserClientRepository();
  }

  /**
   * Load Clients with projects and categories.
   * @param {string} userId
   * */
  async loadUserClients(
    userId: string
  ): Promise<ClientWithProjectsWithCategories[]> {
    console.log('Carregando clientes!');

    const userClients = await this.userUserClientRepository.list({
      field: 'userId',
      value: userId,
    });

    const loadClients = async (): Promise<ClientEntity[]> => {
      const clients: ClientEntity[] = [];

      const clientsPromise = userClients.map(async (userClient) => {
        const client = await this.clientRepository.show({
          field: 'id',
          value: userClient.clientId,
        });

        if (client) clients.push(client);

        return client;
      });

      await Promise.all(clientsPromise);

      return clients;
    };

    const clients: ClientEntity[] = await loadClients();

    const loadProjects = clients.map(async (client) => {
      const clientProjects = await this.clientProjectRepository.list({
        field: 'clientId',
        value: client.id,
      });

      const loadClientProjects = async () => {
        const projects: ProjectEntity[] = [];

        const projectsPromise = clientProjects.map(async (clientProject) => {
          const project = await this.projectRepository.show({
            field: 'id',
            value: clientProject.projectId,
          });

          if (project) projects.push(project);

          return project;
        });

        await Promise.all(projectsPromise);

        return projects;
      };

      const projects: ProjectEntity[] = await loadClientProjects();

      return { ...client, projects };
    });

    const withProjects: ClientWithProjects[] = await Promise.all(loadProjects);

    const loadCategories = withProjects.map(async (client) => {
      const projectsPromise = client.projects.map(async (project) => {
        const projectCategories = await this.projectCategoryRepository.list({
          field: 'projectId',
          value: project.id,
        });

        const loadProjectCategories = async () => {
          const categories: CategoryEntity[] = [];

          const categoriesPromise = projectCategories.map(
            async (projectCategory) => {
              const category = await this.categoryRepository.show({
                field: 'id',
                value: projectCategory.categoryId,
              });

              if (category) categories.push(category);

              return category;
            }
          );

          await Promise.all(categoriesPromise);

          return categories;
        };

        const categories: CategoryEntity[] = await loadProjectCategories();

        return { ...project, categories };
      });

      const projects = await Promise.all(projectsPromise);

      return { ...client, projects };
    });

    return await Promise.all(loadCategories);
  }
}

export const UserClient = new UserClientController();
