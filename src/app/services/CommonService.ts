import { Users } from '../../domain/user';
import { EntityTarget, getRepository, Repository } from 'typeorm';
import { Rooms } from '../../domain/room';
import { ObjectId } from 'mongodb';
import { UserUpdate } from '../controllers/requests/UserUpdate';
import { RoomUpdate } from '../controllers/requests/RoomUpdate';

export class CommonService {
  public static async getById(
    id: string,
    collection: EntityTarget<Users | Rooms>
  ): Promise<any> {
    try {
      const getObjectId: ObjectId = new ObjectId(id);
      const repository: Repository<Users | Rooms> = getRepository(collection);
      return await repository.findOne({ _id: getObjectId });
    } catch (err) {
      console.log(err);
    }
  }

  public static async getWholeCollection(
    collection: EntityTarget<Users | Rooms>
  ): Promise<Array<Users | Rooms> | undefined> {
    try {
      const repository: Repository<Users | Rooms> = getRepository(collection);
      return await repository.find();
    } catch (err) {
      console.log(err);
    }
  }

  public static async addNewItem(
    newItem: Users | Rooms,
    repository
  ): Promise<void> {
    try {
      const userRepository = getRepository(repository);
      await userRepository.save(newItem);
    } catch (err) {
      console.log(err);
    }
  }

  public static async deleteById(
    id: string,
    collection: EntityTarget<Users | Rooms>
  ): Promise<void> {
    try {
      const getObjectId: ObjectId = new ObjectId(id);
      const repository: Repository<Users | Rooms> = getRepository(collection);
      await repository.delete({ _id: getObjectId });
    } catch (err) {
      console.log(err);
    }
  }

  public static async editById(
    id: string,
    body: UserUpdate | RoomUpdate,
    collection: EntityTarget<Users | Rooms>
  ): Promise<void> {
    try {
      const repository: Repository<Users | Rooms> = getRepository(collection);
      let element: Users | Rooms = await CommonService.getById(id, collection);
      element = this.saveIncomeProperties(element, body);
      await repository.save(element);
    } catch (err) {
      console.log(err);
    }
  }

  private static saveIncomeProperties(
    updatedElement: any,
    updateBody: UserUpdate | RoomUpdate
  ): Users | Rooms {
    const updateKeys: string[] = Object.keys(updateBody);
    updateKeys.forEach((property: string): void => {
      if (
        typeof updateBody[property] === 'object' &&
        Object.keys(updateBody[property]).length > 0
      ) {
        const basicObject = updatedElement[property]
          ? updatedElement[property]
          : {};
        updatedElement[property] = this.saveIncomeProperties(
          basicObject,
          updateBody[property]
        );
      } else {
        updatedElement[property] =
          updateBody[property] !== ''
            ? updateBody[property]
            : updatedElement[property];
      }
    });
    return updatedElement;
  }
}
