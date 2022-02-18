import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  Collection,
  ProjectDocument,
  ProjectEntity,
  WithId,
} from '@/types/firestore';

interface IProject {
  create(attributes: ProjectDocument): Promise<ProjectEntity>;
  list(): Promise<ProjectEntity[]>;

  show(query: {
    field: 'id';
    value: ProjectEntity['id'];
  }): Promise<ProjectEntity>;
  show(query: {
    field: 'name';
    value: ProjectEntity['name'];
  }): Promise<ProjectEntity>;
  show(query: {
    field: 'startDate';
    value: ProjectEntity['startDate'];
  }): Promise<ProjectEntity>;
  show(query: {
    field: 'endDate';
    value: ProjectEntity['endDate'];
  }): Promise<ProjectEntity>;
  show(query: {
    field: 'clientId';
    value: ProjectEntity['clientId'];
  }): Promise<ProjectEntity>;

  update(attributes: WithId<Partial<ProjectDocument>>): Promise<ProjectEntity>;
  delete(id: ProjectEntity['id']): Promise<void>;
}

/**
 * @repository ProjectRepository
 * */
export class ProjectRepository
  extends BaseRepository<ProjectDocument>
  implements IProject
{
  /** Define path of Projects */
  constructor() {
    super(Collection.Project);
  }
}
