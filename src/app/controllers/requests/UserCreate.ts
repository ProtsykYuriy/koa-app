import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { RoomCreate } from './RoomCreate';

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

  @IsOptional()
  room: RoomCreate;
}
