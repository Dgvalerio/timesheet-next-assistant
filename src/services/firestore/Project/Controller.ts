import { ClientProjectRepository } from '@/services/firestore/ClientProject/Repository';
import { ProjectRepository } from '@/services/firestore/Project/Repository';
import { ProjectDocument, ProjectEntity } from '@/types/firestore';

type CreateProjectDTO = { id?: string; clientId: string } & ProjectDocument;

interface IProject {
  create(attributes: CreateProjectDTO): Promise<ProjectEntity>;
}

/**
 * @controller ProjectController
 * */
class ProjectController implements IProject {
  private projectRepository: ProjectRepository;
  private clientProjectRepository: ClientProjectRepository;

  /** Init repository */
  constructor() {
    this.projectRepository = new ProjectRepository();
    this.clientProjectRepository = new ClientProjectRepository();
  }

  /**
   * Create an Entity
   * @param {CreateProjectDTO} attributes - attributes of Entity.
   * @return {WithId<Object>}
   * */
  async create(attributes: CreateProjectDTO): Promise<ProjectEntity> {
    const { clientId, ...data } = attributes;

    const project = await this.projectRepository.create(data);

    await this.clientProjectRepository.create({
      id: `${project.id}_${clientId}`,
      clientId: clientId,
      projectId: project.id,
    });

    return project;
  }
}

export const Project = new ProjectController();
