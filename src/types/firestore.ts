import Protocol from 'devtools-protocol';

export type WithId<GenericDocument> = { id: string } & GenericDocument;

export enum Collection {
  User = 'User',
  UserClient = 'UserClient',
  Client = 'Client',
  Project = 'Project',
  Category = 'Category',
  Appointment = 'Appointment',
}

export interface UserDocument {
  name: string;
  email: string;
  photoURL: string;
  cookies: Protocol.Network.Cookie[];
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
export interface ClientWithProjects extends ClientEntity {
  projects: ProjectEntity[];
}

export interface ProjectDocument {
  name: string;
  startDate: string;
  endDate: string;
  clientId: string; // [ref: > Client.id];
}
export type ProjectEntity = WithId<ProjectDocument>;
export interface ProjectWithCategories extends ProjectEntity {
  categories: CategoryEntity[];
}

export interface CategoryDocument {
  name: string;
  projectId: string; // [ref: > Project.id];
}
export type CategoryEntity = WithId<CategoryDocument>;

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
