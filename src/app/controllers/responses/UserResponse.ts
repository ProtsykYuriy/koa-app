import { RoomResponse } from "./RoomResponse";

export class UserResponse {
  name: string;

  surname: string;

  email: string;

  phone: string;

  rooms: {
    room: RoomResponse;

    moveInDate: Date;

    moveOutDate: Date;
  }[];
}