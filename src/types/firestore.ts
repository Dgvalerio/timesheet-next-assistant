import { CryptoHash } from '@/utils/crypto';

export type WithId<GenericDocument> = { id: string } & GenericDocument;

export enum Collection {
  UserPreferences = 'UserPreferences',
  User = 'User',
  UserClient = 'UserClient',
  Client = 'Client',
  Project = 'Project',
  Category = 'Category',
  Appointment = 'Appointment',
}

export interface UserPreferencesDocument {
  userId: string; // [ref: > User.uid]
  lubyMail: string;
  lubyPass: CryptoHash;
}
export type UserPreferencesEntity = WithId<UserPreferencesDocument>;

export interface UserDocument {
  name: string;
  email: string;
  photoURL: string;
}
export type UserEntity = WithId<UserDocument>;

export interface UserClientDocument {
  userId: string; // [ref: > User.uid]
  clientId: string; // [ref: > Client.id]
}
export type UserClientEntity = WithId<UserClientDocument>;

export interface ClientDocument {
  title: string;
}
export type ClientEntity = WithId<ClientDocument>;

export interface ProjectDocument {
  name: string;
  startDate: string;
  endDate: string;
}
export type ProjectEntity = WithId<ProjectDocument>;

export interface ClientProjectDocument {
  clientId: string; // [ref: > Client.id]
  projectId: string; // [ref: > Project.id]
}
export type ClientProjectEntity = WithId<ClientProjectDocument>;

export interface CategoryDocument {
  name: string;
}
export type CategoryEntity = WithId<CategoryDocument>;

export interface ProjectCategoryDocument {
  projectId: string; // [ref: > Project.id]
  categoryId: string; // [ref: > Category.id]
}
export type ProjectCategoryEntity = WithId<ProjectCategoryDocument>;

export interface AppointmentDocument {
  userUid: string; // [ref: > User.uid]
  clientId: string; // [ref: > Client.id];
  projectId: string; // [ref: > Project.id];
  categoryId: string; // [ref: > Category.id];
  informedDate: string;
  startTime: string;
  endTime: string;
  notMonetize: boolean;
  description: string;
}
export type AppointmentEntity = WithId<AppointmentDocument>;

export interface ClientWithProjects extends ClientEntity {
  projects: ProjectEntity[];
}
export interface ClientWithProjectsWithCategories extends ClientEntity {
  projects: ProjectWithCategories[];
}

export interface ProjectWithCategories extends ProjectEntity {
  categories: CategoryEntity[];
}
