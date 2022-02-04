import { WrapperApi } from '@/types/api';

export type ClientTree = Record<
  string,
  { id: string; title: string; projects: ProjectTree }
>;

export type ProjectTree = Record<
  string,
  {
    Name: string;
    StartDate: string;
    EndDate: string;
    IdCustomer: number;
    categories: CategoryTree;
    progress: WrapperApi.Read.Clients.ProjectProgress;
  }
>;

export type CategoryTree = Record<string, WrapperApi.Read.Clients.Category>;

export const transformClientListInTree = (
  clients: WrapperApi.Read.Clients.Client[]
): ClientTree => {
  const clientsTree: ClientTree = {};

  clients.forEach((clientTwig) => {
    const projectsTree: ProjectTree = {};

    clientTwig.projects.forEach((projectTwig) => {
      const categoriesTree: CategoryTree = {};

      projectTwig.categories.forEach((categoryTwig) => {
        categoriesTree[categoryTwig.Id] = { ...categoryTwig };
      });

      projectsTree[projectTwig.Id] = {
        ...projectTwig,
        categories: categoriesTree,
      };
    });

    clientsTree[clientTwig.id] = {
      ...clientTwig,
      projects: projectsTree,
    };
  });

  return clientsTree;
};
