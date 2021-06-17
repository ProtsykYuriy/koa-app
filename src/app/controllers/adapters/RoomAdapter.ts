import { RoomBooked } from './../requests/RoomBooked';
import { Rooms } from './../../../domain/room';
import { RoomUpdate } from "../requests/RoomUpdate";
import { UserUpdate } from "../requests/UserUpdate";
import { RoomCreate } from '../requests/RoomCreate';
import { RoomResponse } from '../responses/RoomResponse';

export class RoomAdapter {
  public static updateRoomProperties(
    updatedElement: RoomBooked | Rooms,
    updateBody: UserUpdate | RoomUpdate
  ): any {
    //refactor as if we always get full object
    // const updateKeys: string[] = Object.keys(updateBody);
    // updateKeys.forEach((property: string): void => {
    //   if (
    //     typeof updateBody[property] === 'object' &&
    //     Object.keys(updateBody[property]).length > 0
    //   ) {
    //     const basicObject = updatedElement[property]
    //       ? updatedElement[property]
    //       : {};
    //     updatedElement[property] = this.updateRoomProperties(
    //       basicObject,
    //       updateBody[property]
    //     );
    //   } else {
    //     updatedElement[property] =
    //       updateBody[property] !== ''
    //         ? updateBody[property]
    //         : updatedElement[property];
    //   }
    // });
    // return updatedElement;
    return Object.assign(updatedElement, updateBody)
  }

  public static createRequestToRoomEntity(
    body: RoomCreate
  ): Rooms{
    const newEntityRoomObject = new Rooms();
    return Object.assign(newEntityRoomObject, body);
  }

  public static convertRoomIdToString(obj: any): RoomResponse{
    obj.id = obj._id.toString();
    delete obj._id;
    return obj
  }
}
