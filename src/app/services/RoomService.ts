import { Rooms } from '../../domain/room';
import { Users } from '../../domain/user';
import { BookedRoom } from '../../domain/bookedRoom';
import { getRepository, Repository } from 'typeorm';
import { RoomBookedDates } from '../controllers/requests/roomBookedDates';
import { RoomUpdate } from '../controllers/requests/RoomUpdate';
import { RoomAdapter } from '../controllers/adapters/RoomAdapter';
import { ObjectId } from 'mongodb';
import { UserService } from './UserServices';

export class RoomService {
  public static async getRoomById(
    id: string
  ): Promise<Rooms | undefined> {
      const getObjectId = new ObjectId(id);
      const repository: Repository<Rooms> = getRepository(Rooms);
      return repository.findOne({ _id: getObjectId });
  }

  public static async getAllRooms(
    minPrice: number = 0,
    maxPrice: number = 10000
  ): Promise<Array<Rooms>> {
    try {
      const repository: Repository<Rooms> = getRepository(Rooms);
      return repository.find({
        where: {
          price: { $lt: maxPrice, $gt: minPrice },
        },
      });
    } catch (err) {
      throw(err);
    }
  }

  public static async addNewRoom(
    newRoom: Rooms
  ): Promise<Rooms> {
    try {
      const roomRepository = getRepository(Rooms);
      await roomRepository.save(newRoom);
      return newRoom;
    } catch (err) {
    throw(err);
    }
  }

  public static async deleteRoomById(
    id: string
  ): Promise<Rooms | undefined> {
    try {
      const getObjectId: ObjectId = new ObjectId(id);
      const repository: Repository<Rooms> = getRepository(Rooms);
      const deletedRoom = await repository.findOne({ _id: getObjectId });
      await repository.delete({ _id: getObjectId });
      return deletedRoom;
    } catch (err) {
      throw(err);
    }
  }

  public static async bookRoom(
    userId: string,
    roomId: string,
    roomBookedDates: RoomBookedDates,
  ): Promise<Users> {
    try {
      const UserRepository: Repository<Users> = getRepository(Users);
      let [room, user] = await Promise.all([
        RoomService.getRoomById(roomId),
        UserService.getUserById(userId)
      ]);
      const bookedRoom = new BookedRoom();
      //?????????????????????
      if(room){
        bookedRoom.room = room
      };
      bookedRoom.moveInDate = new Date(roomBookedDates.moveInDate);
      bookedRoom.moveOutDate = new Date(roomBookedDates.moveOutDate);
      user.rooms.push(bookedRoom);
      UserRepository.save(user);
      return user;
    } catch (err) {
      throw(err);
    }
  }

  public static async cancelBookedRoom(
    userId: string,
    roomId: string,
    roomBookedDates: RoomBookedDates
  ): Promise<Users | undefined>  {
    try {
      const UserRepository: Repository<Users> = getRepository(Users);
      const user = await UserService.getUserById(userId);
      user.rooms = user.rooms.filter(bookedRoom=>{
        return !(bookedRoom.room._id.equals(new ObjectId(roomId)) &&
        bookedRoom.moveInDate.getTime() === new Date(roomBookedDates.moveInDate).getTime() &&
        bookedRoom.moveOutDate.getTime() === new Date(roomBookedDates.moveOutDate).getTime())
      });
      await UserRepository.save(user);
      return user;
    } catch (err) {
      throw(err);
    }
  }

  public static async editRoomById(
    id: string,
    body:  RoomUpdate,
  ): Promise<Rooms> {
    try {
      const repository: Repository<Rooms> = getRepository(Rooms);
      //?????????????????????
      let room: any = await RoomService.getRoomById(id);
      room = RoomAdapter.updateRoomProperties(room, body);
      await repository.save(room);
      return room;
    } catch (err) {
      throw(err);
    }
  }
}
