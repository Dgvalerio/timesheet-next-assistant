import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  Collection,
  CategoryDocument,
  CategoryEntity,
  WithId,
} from '@/types/firestore';

interface ICategory {
  create(attributes: CategoryDocument): Promise<CategoryEntity>;
  list(): Promise<CategoryEntity[]>;

  show(query: {
    field: 'id';
    value: CategoryEntity['id'];
  }): Promise<CategoryEntity | void>;
  show(query: {
    field: 'name';
    value: CategoryEntity['name'];
  }): Promise<CategoryEntity | void>;
  show(query: {
    field: 'projectId';
    value: CategoryEntity['projectId'];
  }): Promise<CategoryEntity | void>;

  update(
    attributes: WithId<Partial<CategoryDocument>>
  ): Promise<CategoryEntity>;
  delete(id: CategoryEntity['id']): Promise<void>;
}

/**
 * @repository CategoryRepository
 * */
export class CategoryRepository
  extends BaseRepository<CategoryDocument>
  implements ICategory
{
  /** Define path of Categories */
  constructor() {
    super(Collection.Category);
  }
}
