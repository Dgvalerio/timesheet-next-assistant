import { Category } from '@/services/firestore/Category/Controller';
import { ClientRepository } from '@/services/firestore/Client/Repository';
import { Project } from '@/services/firestore/Project/Controller';
import { UserClientRepository } from '@/services/firestore/UserClient/Repository';
import { ScrapperApi } from '@/services/scrapperApi';

import Protocol from 'devtools-protocol';

interface IClient {
  updateClients(
    userId: string,
    cookies: Protocol.Network.Cookie[]
  ): Promise<void>;
}

/**
 * @controller ClientController
 * */
class ClientController implements IClient {
  private categoryController: typeof Category;
  private clientRepository: ClientRepository;
  private projectController: typeof Project;
  private userClientRepository: UserClientRepository;
  private scrapper: typeof ScrapperApi;

  /** Init repository */
  constructor() {
    this.categoryController = Category;
    this.clientRepository = new ClientRepository();
    this.projectController = Project;
    this.userClientRepository = new UserClientRepository();

    this.scrapper = ScrapperApi;
  }

  /**
   * Update Clients, projects and categories.
   * @param {string} userId
   * @param {Protocol.Network.Cookie[]} cookies
   * */
  async updateClients(
    userId: string,
    cookies: Protocol.Network.Cookie[]
  ): Promise<void> {
    console.log('Atualizando clientes!');
    const { clients } = await ScrapperApi.readClients({ cookies });

    if (!clients) return;

    const addClientsPromise = clients.map(async (client) => {
      await this.clientRepository.create({
        id: client.id,
        title: client.title,
      });
      await this.userClientRepository.create({
        id: `${client.id}_${userId}`,
        clientId: client.id,
        userId,
      });

      const addProjectsPromise = client.projects.map(async (project) => {
        await this.projectController.create({
          id: String(project.Id),
          name: project.Name,
          startDate: project.StartDate,
          endDate: project.EndDate,
          clientId: client.id,
        });

        const addCategoriesPromise = project.categories.map(
          async (category) => {
            await this.categoryController.create({
              id: String(category.Id),
              name: category.Name,
              projectId: String(project.Id),
            });
          }
        );

        await Promise.all(addCategoriesPromise);
      });

      await Promise.all(addProjectsPromise);
    });

    await Promise.all(addClientsPromise);
  }
}

export const Client = new ClientController();
