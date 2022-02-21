import { CategoryRepository } from '@/services/firestore/Category/Repository';
import { ClientRepository } from '@/services/firestore/Client/Repository';
import { ProjectRepository } from '@/services/firestore/Project/Repository';
import { UserClientRepository } from '@/services/firestore/UserClient/Repository';
import {
  ClientEntity,
  ClientWithProjects,
  ClientWithProjectsWithCategories,
} from '@/types/firestore';

interface IUserClient {
  loadUserClients(userId: string): Promise<ClientWithProjectsWithCategories[]>;
}

/**
 * @controller UserClientController
 * */
class UserClientController implements IUserClient {
  private clientRepository: ClientRepository;
  private projectRepository: ProjectRepository;
  private categoryRepository: CategoryRepository;
  private userUserClientRepository: UserClientRepository;

  /** Init repositories */
  constructor() {
    this.clientRepository = new ClientRepository();
    this.projectRepository = new ProjectRepository();
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
      const projects = await this.projectRepository.list({
        field: 'clientId',
        value: client.id,
      });

      return { ...client, projects };
    });

    const withProjects: ClientWithProjects[] = await Promise.all(loadProjects);

    const loadCategories = withProjects.map(async (client) => {
      const projectsPromise = client.projects.map(async (project) => {
        const categories = await this.categoryRepository.list({
          field: 'projectId',
          value: project.id,
        });

        return { ...project, categories };
      });

      const projects = await Promise.all(projectsPromise);

      return { ...client, projects };
    });

    return await Promise.all(loadCategories);
  }
}

export const UserClient = new UserClientController();
