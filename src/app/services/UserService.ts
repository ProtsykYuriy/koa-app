import { Users } from '../../domain/user';
import { Rooms } from '../../domain/room';
import { getRepository, Repository } from 'typeorm';
import { CommonService } from './CommonService';

export class UserService {
  public static async assignRoomToUser(
    userId: string,
    roomId: string
  ): Promise<void> {
    try {
      const UserRepository: Repository<Users> = getRepository(Users);
      const room: Rooms = await CommonService.getById(roomId, Rooms);
      const user: Users = await CommonService.getById(userId, Users);
      user.room = room;
      await UserRepository.save(user);
    } catch (err) {
      console.log(err);
    }
  }

  public static async unassignRoomFromUser(userId: string): Promise<void> {
    try {
      const UserRepository: Repository<Users> = getRepository(Users);
      const user = await CommonService.getById(userId, Users);
      user.room = null;
      await UserRepository.save(user);
    } catch (err) {
      console.log(err);
    }
  }
}
