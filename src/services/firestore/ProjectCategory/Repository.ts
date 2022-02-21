import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  ProjectCategoryDocument,
  ProjectCategoryEntity,
  Collection,
  WithId,
} from '@/types/firestore';

type ListAndShowQuery =
  | { field: 'id'; value: ProjectCategoryEntity['id'] }
  | { field: 'projectId'; value: ProjectCategoryEntity['projectId'] }
  | { field: 'categoryId'; value: ProjectCategoryEntity['categoryId'] };

interface ProjectCategory {
  create(attributes: ProjectCategoryEntity): Promise<ProjectCategoryEntity>;
  list(query?: ListAndShowQuery): Promise<ProjectCategoryEntity[]>;
  show(query: ListAndShowQuery): Promise<ProjectCategoryEntity | void>;
  update(
    attributes: WithId<Partial<ProjectCategoryDocument>>
  ): Promise<ProjectCategoryEntity>;
  delete(id: ProjectCategoryEntity['id']): Promise<void>;
}

/**
 * @repository ProjectCategoryRepository
 * */
export class ProjectCategoryRepository
  extends BaseRepository<ProjectCategoryDocument>
  implements ProjectCategory
{
  /** Define path of ProjectCategories */
  constructor() {
    super(Collection.ProjectCategory);
  }
}
