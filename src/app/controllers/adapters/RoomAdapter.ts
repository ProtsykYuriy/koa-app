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
