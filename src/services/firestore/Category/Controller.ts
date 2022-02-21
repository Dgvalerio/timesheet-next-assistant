import { CategoryRepository } from '@/services/firestore/Category/Repository';
import { ProjectCategoryRepository } from '@/services/firestore/ProjectCategory/Repository';
import { CategoryDocument, CategoryEntity } from '@/types/firestore';

type CreateCategoryDTO = { id?: string; projectId: string } & CategoryDocument;

interface ICategory {
  create(attributes: CreateCategoryDTO): Promise<CategoryEntity>;
}

/**
 * @controller CategoryController
 * */
class CategoryController implements ICategory {
  private categoryRepository: CategoryRepository;
  private projectCategoryRepository: ProjectCategoryRepository;

  /** Init repository */
  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.projectCategoryRepository = new ProjectCategoryRepository();
  }

  /**
   * Create an Entity
   * @param {CreateCategoryDTO} attributes - attributes of Entity.
   * @return {WithId<Object>}
   * */
  async create(attributes: CreateCategoryDTO): Promise<CategoryEntity> {
    const { projectId, ...data } = attributes;

    const category = await this.categoryRepository.create(data);

    await this.projectCategoryRepository.create({
      id: `${category.id}_${projectId}`,
      projectId: projectId,
      categoryId: category.id,
    });

    return category;
  }
}

export const Category = new CategoryController();
