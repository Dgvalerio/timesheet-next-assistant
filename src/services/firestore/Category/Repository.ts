import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  Collection,
  CategoryDocument,
  CategoryEntity,
  WithId,
} from '@/types/firestore';

type ListAndShowQuery =
  | { field: 'id'; value: CategoryEntity['id'] }
  | { field: 'name'; value: CategoryEntity['name'] };

interface ICategory {
  create(attributes: CategoryDocument): Promise<CategoryEntity>;
  list(query?: ListAndShowQuery): Promise<CategoryEntity[]>;
  show(query: ListAndShowQuery): Promise<CategoryEntity | void>;
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
