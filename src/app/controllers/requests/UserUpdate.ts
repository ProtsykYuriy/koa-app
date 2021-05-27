import { IsString, IsOptional } from 'class-validator';
import { RoomUpdate } from './RoomUpdate';

export class UserUpdate {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  rooms: {
    room: RoomUpdate,
    moveInDate:string,
    moveOutString:string,
  }[];
}
