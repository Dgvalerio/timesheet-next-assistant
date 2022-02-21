import { BaseRepository } from '@/services/firestore/Base/Repository';
import {
  ClientProjectDocument,
  ClientProjectEntity,
  Collection,
  WithId,
} from '@/types/firestore';

type ListAndShowQuery =
  | { field: 'id'; value: ClientProjectEntity['id'] }
  | { field: 'clientId'; value: ClientProjectEntity['clientId'] }
  | { field: 'projectId'; value: ClientProjectEntity['projectId'] };

interface IClientProject {
  create(attributes: ClientProjectEntity): Promise<ClientProjectEntity>;
  list(query?: ListAndShowQuery): Promise<ClientProjectEntity[]>;
  show(query: ListAndShowQuery): Promise<ClientProjectEntity | void>;
  update(
    attributes: WithId<Partial<ClientProjectDocument>>
  ): Promise<ClientProjectEntity>;
  delete(id: ClientProjectEntity['id']): Promise<void>;
}

/**
 * @repository ClientProjectRepository
 * */
export class ClientProjectRepository
  extends BaseRepository<ClientProjectDocument>
  implements IClientProject
{
  /** Define path of ClientProjects */
  constructor() {
    super(Collection.ClientProject);
  }
}
