export interface Client {
  id: string;
  title: string;
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  categories: Category[];
  clientId: string;
}

export interface Category {
  id: string;
  name: string;
  projectId: string;
}
