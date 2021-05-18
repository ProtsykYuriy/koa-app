import { IsBoolean, IsOptional } from 'class-validator';

export class FacilitiesUpdate {
  @IsBoolean()
  @IsOptional()
  freeWiFi: boolean;

  @IsBoolean()
  @IsOptional()
  freeParking: boolean;

  @IsBoolean()
  @IsOptional()
  freeAdditionalBed: boolean;

  @IsBoolean()
  @IsOptional()
  petsAllowed: boolean;

  @IsBoolean()
  @IsOptional()
  freeCarWash: boolean;
}
