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
  show(id: ProjectEntity['id']): Promise<ProjectEntity>;
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
