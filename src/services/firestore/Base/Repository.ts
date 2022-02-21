/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any */
import { firestore } from '@/config/firebase';
import { Collection, WithId } from '@/types/firestore';
import { sorterBy } from '@/utils/sorterBy';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  addDoc,
} from '@firebase/firestore';

interface ListAndShowQuery<Entity> {
  field: keyof Entity;
  value: any;
}

interface IBase<GenericDocument> {
  create(
    attributes: { id?: string } & GenericDocument
  ): Promise<WithId<GenericDocument>>;
  list(
    listQuery?: ListAndShowQuery<WithId<GenericDocument>>
  ): Promise<WithId<GenericDocument>[]>;
  show(
    showQuery: ListAndShowQuery<WithId<GenericDocument>>
  ): Promise<WithId<GenericDocument> | void>;
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
    attributes: { id?: string } & GenericDocument
  ): Promise<WithId<GenericDocument>> {
    const { id, ...data } = attributes;

    if (id) {
      const reference = doc(firestore, this._path, id);

      await setDoc(reference, data);

      const entity = await this.show({ field: 'id', value: id });

      return entity!;
    } else {
      const reference = collection(firestore, this._path);

      await addDoc(reference, data);

      const entity = await this.show({ field: 'id', value: reference.id });

      return entity!;
    }
  }

  /**
   * List Entities
   * @param {WithId<Object>} listQuery - attributes of query.
   * @return {WithId<Object>[]}
   * */
  async list(
    listQuery?: ListAndShowQuery<WithId<GenericDocument>>
  ): Promise<WithId<GenericDocument>[]> {
    const reference = collection(firestore, this._path);

    let snapshot = await getDocs(reference);

    if (listQuery) {
      const dataQuery = query(
        reference,
        where(listQuery.field as string, '==', listQuery.value)
      );

      snapshot = await getDocs(dataQuery);
    }

    const items = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as WithId<GenericDocument>)
    );

    return sorterBy(items, 'id');
  }

  /**
   * Show an Entity
   * @param {Object} dto - Options of query,
   * @return {void}
   * */
  async show({
    field,
    value,
  }: ListAndShowQuery<
    WithId<GenericDocument>
  >): Promise<WithId<GenericDocument> | void> {
    const reference = collection(firestore, this._path);

    const dataQuery = query(reference, where(field as string, '==', value));

    const snapshot = await getDocs(dataQuery);

    const doc = snapshot.docs[0];

    if (!doc) return;

    return { id: doc.id, ...doc.data() } as WithId<GenericDocument>;
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

    const entity = await this.show({ field: 'id', value: id });

    return entity!;
  }

  /**
   * Delete an Entity
   * @param {string} id - id of Entity.
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
