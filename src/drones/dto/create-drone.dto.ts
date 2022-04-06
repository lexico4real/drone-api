import { IsEnum, IsNotEmpty, Max, Min } from 'class-validator';
import { Model } from '../enums';

export class CreateDroneDto {
  @IsEnum(Model, {
    message:
      'Model is not valid. Choose any of: LIGHT_WEIGHT, MIDDLE_WEIGHT, CRUISER_WEIGHT, HEAVY_WEIGHT',
  })
  model: Model;

  @IsNotEmpty()
  @Min(0)
  @Max(100, { message: 'Battery capacity cannot be more than 100%' })
  batteryCapacity: number;

  @IsNotEmpty()
  @Min(0)
  @Max(500, { message: 'Weight limit cannot be more than 500kg' })
  weightLimit: number;
}
