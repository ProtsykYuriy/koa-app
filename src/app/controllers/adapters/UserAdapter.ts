import { CommonAdapter } from './CommonAdapter';
import { BookedRoom } from "../../../domain/bookedRoom";
import { Users } from "../../../domain/user";
import { UserUpdate } from "../requests/UserUpdate";
import { RoomAdapter } from './RoomAdapter';

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

  public static updateUserPersonalInfo(user: Users, updateUserBody: UserUpdate): any {
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
    CommonAdapter.convertIncomeUpdateDataFormat(updateRoomsBody);
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
}
