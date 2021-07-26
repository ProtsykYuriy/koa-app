import { BookedRoom } from "../../../domain/bookedRoom";
import { Users } from "../../../domain/user";
import { UserUpdate } from "../requests/UserUpdate";
import { RoomAdapter } from './RoomAdapter';
import { UserCreate } from '../requests/UserCreate';
import { ObjectId } from 'mongodb';
import { UserResponse } from "../responses/UserResponse";

export class UserAdapter {
  public static updateUserProperties(
    updatedElement: Users,
    updateBody: UserUpdate
  ): Users {
    updatedElement = this.updateUserPersonalInfo(updatedElement, updateBody);
    if (updateBody.rooms && updateBody.rooms.length) {
      updatedElement.rooms = this.updateUserBookedRoomsInfo(
        updatedElement.rooms,
        updateBody.rooms
      );
    }
    return updatedElement;
  }

  public static updateUserPersonalInfo(user: Users, updateUserBody: UserUpdate): Users {
    const updateKeys: string[] = Object.keys(updateUserBody);
    updateKeys.forEach((property: string) => {
      user[property] =
        updateUserBody[property] !== '' && property !== 'rooms'
          ? updateUserBody[property]
          : user[property];
    });
    return user;
  }

  public static updateUserBookedRoomsInfo(userRoomsArr: BookedRoom[], updateRoomsBody: any[]): BookedRoom[] {
    this.convertIncomeUpdateDataFormat(updateRoomsBody);
    updateRoomsBody.forEach((room) => {
      for (let i = 0; i < userRoomsArr.length; i++) {
        if (
          room.room._id.equals(userRoomsArr[i].room._id) &&
          room.moveInDate.getTime() === userRoomsArr[i].moveInDate.getTime() &&
          room.moveOutDate.getTime() === userRoomsArr[i].moveOutDate.getTime()
        ) {
          userRoomsArr[i] = RoomAdapter.updateRoomProperties(userRoomsArr[i], room);
        }
      }
    });
    return userRoomsArr;
  }

  public static convertIncomeUpdateDataFormat(arr: any[]): void {
    arr.forEach((bookedRoom) => {
      bookedRoom.room._id = new ObjectId(bookedRoom.room._id);
      bookedRoom.moveInDate = new Date(bookedRoom.moveInDate);
      bookedRoom.moveOutDate = new Date(bookedRoom.moveOutDate);
    });
  }

  public static createRequestToUserEntity(
    body: UserCreate
  ): Users{
    const newEntityUserObject = new Users();
    return Object.assign(newEntityUserObject, body);
  }

  public static convertUserIdToString(obj: any): UserResponse{
    obj._id = obj._id.toString();
    return obj
  }
}
