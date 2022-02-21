import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  Collection,
  ProjectDocument,
  ProjectEntity,
  WithId,
} from '@/types/firestore';

type ListAndShowQuery =
  | { field: 'id'; value: ProjectEntity['id'] }
  | { field: 'name'; value: ProjectEntity['name'] }
  | { field: 'startDate'; value: ProjectEntity['startDate'] }
  | { field: 'endDate'; value: ProjectEntity['endDate'] };

interface IProject {
  create(attributes: ProjectDocument): Promise<ProjectEntity>;
  list(query?: ListAndShowQuery): Promise<ProjectEntity[]>;
  show(query: ListAndShowQuery): Promise<ProjectEntity | void>;
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
