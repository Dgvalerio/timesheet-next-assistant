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
  }): Promise<ProjectEntity | void>;
  show(query: {
    field: 'name';
    value: ProjectEntity['name'];
  }): Promise<ProjectEntity | void>;
  show(query: {
    field: 'startDate';
    value: ProjectEntity['startDate'];
  }): Promise<ProjectEntity | void>;
  show(query: {
    field: 'endDate';
    value: ProjectEntity['endDate'];
  }): Promise<ProjectEntity | void>;
  show(query: {
    field: 'clientId';
    value: ProjectEntity['clientId'];
  }): Promise<ProjectEntity | void>;

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
