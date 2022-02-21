import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  Collection,
  UserClientDocument,
  UserClientEntity,
  WithId,
} from '@/types/firestore';

type ListAndShowQuery =
  | { field: 'id'; value: UserClientEntity['id'] }
  | { field: 'userId'; value: UserClientEntity['userId'] }
  | { field: 'clientId'; value: UserClientEntity['clientId'] };

interface IUserClient {
  create(attributes: UserClientDocument): Promise<UserClientEntity>;
  list(query?: ListAndShowQuery): Promise<UserClientEntity[]>;
  show(query: ListAndShowQuery): Promise<UserClientEntity | void>;
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
