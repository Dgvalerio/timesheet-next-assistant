import { firestore } from '@/config/firebase';
import { Collection, WithId } from '@/types/firestore';
import { sorterBy } from '@/utils/sorterBy';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@firebase/firestore';

interface IBase<GenericDocument> {
  create(attributes: WithId<GenericDocument>): Promise<WithId<GenericDocument>>;
  list(): Promise<WithId<GenericDocument>[]>;
  show(
    id: string | WithId<GenericDocument>['id']
  ): Promise<WithId<GenericDocument>>;
  update(
    attributes: WithId<Partial<GenericDocument>>
  ): Promise<WithId<GenericDocument>>;
  delete(id: string | WithId<GenericDocument>['id']): Promise<void>;
}

/**
 * @repository BaseRepository
 * */
export class BaseRepository<GenericDocument> implements IBase<GenericDocument> {
  private readonly _path: Collection;

  /**
   * Constructor to define path
   * @param {Collection} path - path of repository.
   * */
  constructor(path: Collection) {
    this._path = path;
  }

  /**
   * Create an Entity
   * @param {WithId<Object>} attributes - attributes of Entity.
   * @return {WithId<Object>}
   * */
  async create(
    attributes: WithId<GenericDocument>
  ): Promise<WithId<GenericDocument>> {
    const { id, ...data } = attributes;
    const reference = doc(firestore, this._path, id);

    await setDoc(reference, data);

    return this.show(id);
  }

  /**
   * List Entities
   * @return {WithId<Object>[]}
   * */
  async list(): Promise<WithId<GenericDocument>[]> {
    const reference = collection(firestore, this._path);

    const snapshot = await getDocs(reference);

    const items = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as WithId<GenericDocument>)
    );

    return sorterBy(items, 'id');
  }

  /**
   * Show an Entity
   * @param {string} id - Id of Entity.
   * @return {void}
   * */
  async show(
    id: string | WithId<GenericDocument>['id']
  ): Promise<WithId<GenericDocument>> {
    const reference = doc(firestore, this._path, id);

    const snapshot = await getDoc(reference);

    const data = snapshot.data() as GenericDocument;

    return { id, ...data };
  }

  /**
   * Update an Entity
   * @param {WithId<Partial<Object>>} attributes - attributes of Entity.
   * @return {WithId<Partial<Object>>}
   * */
  async update(
    attributes: WithId<Partial<GenericDocument>>
  ): Promise<WithId<GenericDocument>> {
    const { id, ...data } = attributes;
    const reference = doc(firestore, this._path, id);

    await updateDoc(reference, { ...data });

    return this.show(attributes.id);
  }

  /**
   * Delete an Entity
   * @param {string} id - Id of Entity.
   * @return {void}
   * */
  async delete(id: string | WithId<GenericDocument>['id']): Promise<void> {
    const reference = doc(firestore, this._path, id);

    await deleteDoc(reference);
  }

  /** Getter of Path */
  public get path(): Collection {
    return this._path;
  }
}
