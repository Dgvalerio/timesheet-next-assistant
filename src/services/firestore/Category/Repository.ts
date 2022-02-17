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
  show(id: CategoryEntity['id']): Promise<CategoryEntity>;
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
