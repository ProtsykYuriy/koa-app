import { RoomResponse } from './../controllers/responses/RoomResponse';
import { Rooms } from '../../domain/room';
import { Users } from '../../domain/user';
import { BookedRoom } from '../../domain/bookedRoom';
import { getRepository, Repository } from 'typeorm';
import { RoomBookedDates } from '../controllers/requests/RoomBookedDates';
import { CommonService } from './CommonService';
import { RoomUpdate } from '../controllers/requests/RoomUpdate';
import { RoomAdapter } from '../controllers/adapters/RoomAdapter';
import { ObjectId } from 'mongodb';

export class RoomService {
  public static async filterRoomsByPrice(
    minPrice: number = 0,
    maxPrice: number = 10000
  ): Promise<Array<Rooms> | undefined> {
    try {
      const repository: Repository<Rooms> = getRepository(Rooms);
      return await repository.find({
        where: {
          price: { $lt: maxPrice, $gt: minPrice },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  public static async bookRoom(
    userId: string,
    roomId: string,
    roomBookedDates: RoomBookedDates,
  ): Promise<Users | undefined> {
    try {
      const UserRepository: Repository<Users> = getRepository(Users);
      let [room, user] = await Promise.all([
        CommonService.getById(roomId, Rooms),
        CommonService.getById(userId, Users)
      ]);
      const bookedRoom = new BookedRoom();
      bookedRoom.room = room;
      bookedRoom.moveInDate = new Date(roomBookedDates.moveInDate);
      bookedRoom.moveOutDate = new Date(roomBookedDates.moveOutDate);
      user.rooms.push(bookedRoom);
      UserRepository.save(user);
      return user
    } catch (err) {
      console.log(err);
    }
  }

  public static async cancelBookedRoom(
    userId: string,
    roomId: string,
    roomBookedDates: RoomBookedDates
  ): Promise<Users | undefined>  {
    try {
      const UserRepository: Repository<Users> = getRepository(Users);
      const user = await CommonService.getById(userId, Users);
      user.rooms = user.rooms.filter(bookedRoom=>{
        return !(bookedRoom.room._id.equals(new ObjectId(roomId)) &&
        bookedRoom.moveInDate.getTime() === new Date(roomBookedDates.moveInDate).getTime() &&
        bookedRoom.moveOutDate.getTime() === new Date(roomBookedDates.moveOutDate).getTime())
      });
      await UserRepository.save(user);
      return user
    } catch (err) {
      console.log(err);
    }
  }

  public static async editRoomById(
    id: string,
    body:  RoomUpdate,
  ): Promise<RoomResponse | undefined> {
    try {
      const repository: Repository<Rooms> = getRepository(Rooms);
      let element: Rooms = await CommonService.getById(id, Rooms);
      element = RoomAdapter.updateRoomProperties(element, body);
      await repository.save(element);
      return element
    } catch (err) {
      console.log(err);
    }
  }
}
