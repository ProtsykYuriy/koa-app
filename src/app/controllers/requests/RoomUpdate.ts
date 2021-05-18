import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsString,
  IsOptional,
} from 'class-validator';
import { FacilitiesUpdate } from './FacilitiesUpdate';

export class RoomUpdate {
  @IsString()
  @IsOptional()
  roomNumber: string;

  @IsString()
  @IsOptional()
  roomType: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  floor: number;

  @IsBoolean()
  @IsOptional()
  windowFacesSea: boolean;

  @IsBoolean()
  @IsOptional()
  airConditioningSystem: boolean;

  @IsNotEmpty()
  @IsOptional()
  facilities: FacilitiesUpdate;
}
