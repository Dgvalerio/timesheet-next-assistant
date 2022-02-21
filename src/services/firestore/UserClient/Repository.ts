import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  Collection,
  UserClientDocument,
  UserClientEntity,
  WithId,
} from '@/types/firestore';

interface IUserClient {
  create(attributes: UserClientDocument): Promise<UserClientEntity>;
  list(): Promise<UserClientEntity[]>;

  show(query: {
    field: 'id';
    value: UserClientEntity['id'];
  }): Promise<UserClientEntity | void>;
  show(query: {
    field: 'userId';
    value: UserClientEntity['userId'];
  }): Promise<UserClientEntity | void>;
  show(query: {
    field: 'clientId';
    value: UserClientEntity['clientId'];
  }): Promise<UserClientEntity | void>;

  update(
    attributes: WithId<Partial<UserClientDocument>>
  ): Promise<UserClientEntity>;
  delete(id: UserClientEntity['id']): Promise<void>;
}

/**
 * @repository UserClientRepository
 * */
export class UserClientRepository
  extends BaseRepository<UserClientDocument>
  implements IUserClient
{
  /** Define path of UserClients */
  constructor() {
    super(Collection.UserClient);
  }
}
