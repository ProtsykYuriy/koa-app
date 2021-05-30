import { RoomBooked } from './../requests/RoomBooked';
import { Rooms } from './../../../domain/room';
import { RoomUpdate } from "../requests/RoomUpdate";
import { UserUpdate } from "../requests/UserUpdate";

export class RoomAdapter {
  public static updateRoomProperties(
    updatedElement: RoomBooked | Rooms,
    updateBody: UserUpdate | RoomUpdate
  ): any {
    const updateKeys: string[] = Object.keys(updateBody);
    updateKeys.forEach((property: string): void => {
      if (
        typeof updateBody[property] === 'object' &&
        Object.keys(updateBody[property]).length > 0
      ) {
        const basicObject = updatedElement[property]
          ? updatedElement[property]
          : {};
        updatedElement[property] = this.updateRoomProperties(
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
