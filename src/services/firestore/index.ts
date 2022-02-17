import { CategoryRepository } from '@/services/firestore/Category/Repository';
import { ClientRepository } from '@/services/firestore/Client/Repository';
import { ProjectRepository } from '@/services/firestore/Project/Repository';

export const Client = new ClientRepository();
export const Project = new ProjectRepository();
export const Category = new CategoryRepository();
