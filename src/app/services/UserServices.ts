import { UserAdapter } from './../controllers/adapters/UserAdapter';
import { Rooms } from '../../domain/room';
import { Users } from '../../domain/user';
import { BookedRoom } from '../../domain/bookedRoom';
import { getRepository, Repository } from 'typeorm';
import { CommonService } from './CommonService';
import { UserUpdate } from '../controllers/requests/UserUpdate';

export class UserService {
  public static async editUserById(
    id: string,
    body: UserUpdate
  ): Promise<void> {
    try {
      const repository: Repository<Users> = getRepository(Users);
      let element: Users = await CommonService.getById(id, Users);
      element = UserAdapter.updateUserProperties(element, body);
      await repository.save(element);
    } catch (err) {
      console.log(err);
    }
  }
}
