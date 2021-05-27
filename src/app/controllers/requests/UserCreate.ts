import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { RoomBooked } from './RoomBooked';

export class UserCreate {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsArray()
  rooms: RoomBooked[];
}
