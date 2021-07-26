import { IsNotEmpty, IsNumber, IsBoolean, IsString } from 'class-validator';
import { FacilitiesCreate } from './FacilitiesCreate';

export class RoomCreate {
  @IsString()
  @IsNotEmpty()
  roomNumber: string;

  @IsString()
  @IsNotEmpty()
  roomType: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  floor: number;

  @IsBoolean()
  @IsNotEmpty()
  windowFacesSea: boolean;

  @IsBoolean()
  @IsNotEmpty()
  airConditioningSystem: boolean;

  @IsNotEmpty()
  facilities: FacilitiesCreate;
}
