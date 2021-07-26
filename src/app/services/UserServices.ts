import { UserAdapter } from './../controllers/adapters/UserAdapter';
import { Users } from '../../domain/user';
import { getRepository, Repository } from 'typeorm';
import { UserUpdate } from '../controllers/requests/UserUpdate';
import { ObjectId } from 'mongodb';

export class UserService {
  public static async getUserById(
    id: string
  ): Promise<any> {
    try {
      const getObjectId = new ObjectId(id);
      const repository: Repository<Users> = getRepository(Users);
      return repository.findOne({ _id: getObjectId });
    } catch (err) {
      throw(err);
    }
  }

  public static async getAllUsers(
    ): Promise<Array<Users>> {
      try {
        const repository: Repository<Users> = getRepository(Users);
        return repository.find();
      } catch (err) {
        throw err;
      }
    }

    public static async addNewUser(
      newUser: Users
    ): Promise<Users> {
      try {
        const userRepository = getRepository(Users);
        await userRepository.save(newUser);
        return newUser;
      } catch (err) {
        throw(err);
      }
    }

    public static async deleteUserById(
      id: string
    ): Promise<Users | undefined> {
      try {
        const getObjectId: ObjectId = new ObjectId(id);
        const repository: Repository<Users> = getRepository(Users);
        const deletedUser = await repository.findOne({ _id: getObjectId });
        await repository.delete({ _id: getObjectId });
        return deletedUser;
      } catch (err) {
        throw(err);
      }
    }

  public static async editUserById(
    id: string,
    body: UserUpdate
  ): Promise<Users> {
    try {
      const repository: Repository<Users> = getRepository(Users);
      let user: Users = await UserService.getUserById(id);
      user = UserAdapter.updateUserProperties(user, body);
      await repository.save(user);
      return user;
    } catch (err) {
      throw(err);
    }
  }
}
