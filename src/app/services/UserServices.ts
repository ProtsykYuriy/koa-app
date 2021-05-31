import { UserAdapter } from './../controllers/adapters/UserAdapter';
import { Users } from '../../domain/user';
import { getRepository, Repository } from 'typeorm';
import { CommonService } from './CommonService';
import { UserUpdate } from '../controllers/requests/UserUpdate';

export class UserService {
  public static async editUserById(
    id: string,
    body: UserUpdate
  ): Promise<Users | undefined> {
    try {
      const repository: Repository<Users> = getRepository(Users);
      let element: Users = await CommonService.getById(id, Users);
      element = UserAdapter.updateUserProperties(element, body);
      await repository.save(element);
      return element;
    } catch (err) {
      console.log(err);
    }
  }
}
