import { IsNotEmpty, IsString } from 'class-validator';

export class RoomBookedDates {
  @IsString()
  @IsNotEmpty()
  moveInDate: string;

  @IsString()
  @IsNotEmpty()
  moveOutDate: string;
}
