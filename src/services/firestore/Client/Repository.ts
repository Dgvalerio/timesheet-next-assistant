import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  ClientDocument,
  ClientEntity,
  Collection,
  WithId,
} from '@/types/firestore';

type ListAndShowQuery =
  | { field: 'id'; value: ClientEntity['id'] }
  | { field: 'title'; value: ClientEntity['title'] };

interface IClient {
  create(attributes: ClientEntity): Promise<ClientEntity>;
  list(query?: ListAndShowQuery): Promise<ClientEntity[]>;
  show(query: ListAndShowQuery): Promise<ClientEntity | void>;
  update(attributes: WithId<Partial<ClientDocument>>): Promise<ClientEntity>;
  delete(id: ClientEntity['id']): Promise<void>;
}

/**
 * @repository ClientRepository
 * */
export class ClientRepository
  extends BaseRepository<ClientDocument>
  implements IClient
{
  /** Define path of Clients */
  constructor() {
    super(Collection.Client);
  }
}
