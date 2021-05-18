import { Rooms } from '../../../domain/room';
import { Users } from '../../../domain/user';
import { RoomCreate } from '../requests/RoomCreate';
import { UserCreate } from './../requests/UserCreate';

export class CommonAdapter {
  public static createRequestToEntity(
    body: RoomCreate | UserCreate
  ): Rooms | Users {
    return Object.assign(new Rooms(), body);
  }
}
