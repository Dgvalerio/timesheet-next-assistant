import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  Collection,
  UserPreferencesDocument,
  UserPreferencesEntity,
  WithId,
} from '@/types/firestore';

interface IUserPreferences {
  create(attributes: UserPreferencesDocument): Promise<UserPreferencesEntity>;
  list(): Promise<UserPreferencesEntity[]>;

  show(query: {
    field: 'id';
    value: UserPreferencesEntity['id'];
  }): Promise<UserPreferencesEntity>;
  show(query: {
    field: 'userId';
    value: UserPreferencesEntity['userId'];
  }): Promise<UserPreferencesEntity>;
  show(query: {
    field: 'lubyMail';
    value: UserPreferencesEntity['lubyMail'];
  }): Promise<UserPreferencesEntity>;
  show(query: {
    field: 'lubyPass';
    value: UserPreferencesEntity['lubyPass'];
  }): Promise<UserPreferencesEntity>;

  update(
    attributes: WithId<Partial<UserPreferencesDocument>>
  ): Promise<UserPreferencesEntity>;
  delete(id: UserPreferencesEntity['id']): Promise<void>;
}

/**
 * @repository UserPreferencesRepository
 * */
export class UserPreferencesRepository
  extends BaseRepository<UserPreferencesDocument>
  implements IUserPreferences
{
  /** Define path of UserPreferences */
  constructor() {
    super(Collection.UserPreferences);
  }
}
