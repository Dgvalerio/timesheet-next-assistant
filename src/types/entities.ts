export interface Client {
  id: string;
  title: string;
  projects: Project[];
}

export interface Project {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  categories: Category[];
  clientId: number;
}

export interface Category {
  id: number;
  name: string;
  projectId: number;
}
