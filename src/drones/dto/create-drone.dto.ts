import { IsEnum, IsNotEmpty, Max, Min } from 'class-validator';
import { Model } from '../enums';

export class CreateDroneDto {
  @IsEnum(Model, {
    message:
      'Model is not valid. Choose any of: LIGHT_WEIGHT, MIDDLE_WEIGHT, CRUISER_WEIGHT, HEAVY_WEIGHT',
  })
  model: Model;

  @IsNotEmpty()
  @Max(100, { message: 'Battery capacity cannot be more than 100%' })
  battery_capacity: number;

  @IsNotEmpty()
  @Max(500, { message: 'Weight limit cannot be more than 500kg' })
  weight_limit: number;
}
