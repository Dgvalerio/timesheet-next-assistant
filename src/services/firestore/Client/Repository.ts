import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  ClientDocument,
  ClientEntity,
  Collection,
  WithId,
} from '@/types/firestore';

interface IClient {
  create(attributes: ClientEntity): Promise<ClientEntity>;
  list(): Promise<ClientEntity[]>;
  show(id: ClientEntity['id']): Promise<ClientEntity>;
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
