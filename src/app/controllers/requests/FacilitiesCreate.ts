import { IsNotEmpty, IsBoolean } from 'class-validator';

export class FacilitiesCreate {
  @IsBoolean()
  @IsNotEmpty()
  freeWiFi: boolean;

  @IsBoolean()
  @IsNotEmpty()
  freeParking: boolean;

  @IsBoolean()
  @IsNotEmpty()
  freeAdditionalBed: boolean;

  @IsBoolean()
  @IsNotEmpty()
  petsAllowed: boolean;

  @IsBoolean()
  @IsNotEmpty()
  freeCarWash: boolean;
}
