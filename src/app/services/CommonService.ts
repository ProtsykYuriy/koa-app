import { Users } from '../../domain/user';
import { EntityTarget, getRepository, Repository } from 'typeorm';
import { Rooms } from '../../domain/room';
import { ObjectId } from 'mongodb';

export class CommonService {
  public static async getById(
    id: string,
    collection: EntityTarget<Users | Rooms>
  ): Promise<any> {
    try {
      const getObjectId = new ObjectId(id);
      const repository: Repository<Users | Rooms> = getRepository(collection);
      return repository.findOne({ _id: getObjectId });
    } catch (err) {
      console.log(err);
    }
  }

  public static async getAll<Type>(
    collection: EntityTarget<Type>
  ): Promise<Array<Type>> {
    try {
      const repository: Repository<Type> = getRepository(collection);
      return repository.find();
    } catch (err) {
      throw err;
    }
  }

  public static async addNewItem<Type>(
    newItem: Type,
    repository
  ): Promise<any> {
    try {
      const userRepository = getRepository(repository);
      await userRepository.save(newItem);
      return newItem
    } catch (err) {
      console.log(err);
    }
  }

  public static async deleteById(
    id: string,
    collection: EntityTarget<Users | Rooms>
  ): Promise<any> {
    try {
      const getObjectId: ObjectId = new ObjectId(id);
      const repository: Repository<Users | Rooms> = getRepository(collection);
      const deletedElement = await repository.findOne({ _id: getObjectId });
      await repository.delete({ _id: getObjectId });
      return deletedElement
    } catch (err) {
      console.log(err);
    }
  }
}
