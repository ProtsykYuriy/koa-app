import { RoomUpdate } from './../controllers/requests/RoomUpdate';

export interface bookedRoomInterface {
  room: RoomUpdate;
  moveInDate: Date;
  moveOutDate: Date;
}