import { IsEnum, IsNotEmpty, Max, Min } from 'class-validator';
import { Model } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDroneDto {
  @ApiProperty()
  @IsEnum(Model, {
    message:
      'Model is not valid. Choose any of: LIGHT_WEIGHT, MIDDLE_WEIGHT, CRUISER_WEIGHT, HEAVY_WEIGHT',
  })
  model: Model;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  @Max(100, { message: 'Battery capacity cannot be more than 100%' })
  batteryCapacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  @Max(500, { message: 'Weight limit cannot be more than 500kg' })
  weightLimit: number;
}
