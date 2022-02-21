import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  Collection,
  UserPreferencesDocument,
  UserPreferencesEntity,
  WithId,
} from '@/types/firestore';

type ListAndShowQuery =
  | { field: 'id'; value: UserPreferencesEntity['id'] }
  | { field: 'userId'; value: UserPreferencesEntity['userId'] }
  | { field: 'lubyMail'; value: UserPreferencesEntity['lubyMail'] }
  | { field: 'lubyPass'; value: UserPreferencesEntity['lubyPass'] };

interface IUserPreferences {
  create(attributes: UserPreferencesDocument): Promise<UserPreferencesEntity>;
  list(query?: ListAndShowQuery): Promise<UserPreferencesEntity[]>;
  show(query: ListAndShowQuery): Promise<UserPreferencesEntity | void>;
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
