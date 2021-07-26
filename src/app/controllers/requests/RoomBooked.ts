import { RoomCreate } from './RoomCreate';
import { IsNotEmpty } from 'class-validator';

export class RoomBooked {
  @IsNotEmpty()
  room: RoomCreate;

  @IsNotEmpty()
  moveInDate: Date;

  @IsNotEmpty()
  moveOutDate: Date;
}
