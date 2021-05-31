import { ObjectId } from 'mongodb';
import { Rooms } from '../../../domain/room';
import { Users } from '../../../domain/user';
import { RoomCreate } from '../requests/RoomCreate';
import { RoomResponse } from '../responses/RoomResponse';
import { UserResponse } from '../responses/UserResponse';
import { UserCreate } from './../requests/UserCreate';

export class CommonAdapter  {
  public static createRequestToEntity(
    body: RoomCreate | UserCreate
  ): Rooms | Users{
    const newEntityObject = body instanceof RoomCreate? new Rooms() : new Users();
    return Object.assign(newEntityObject, body);
  }

  public static convertIncomeUpdateDataFormat(arr: any[]): void {
    arr.forEach((bookedRoom) => {
      bookedRoom.room._id = new ObjectId(bookedRoom.room._id);
      bookedRoom.moveInDate = new Date(bookedRoom.moveInDate);
      bookedRoom.moveOutDate = new Date(bookedRoom.moveOutDate);
    });
  }

  public static convertIdToString(obj: any): any{
    obj._id = obj._id.toString();
    return obj
  }
}
