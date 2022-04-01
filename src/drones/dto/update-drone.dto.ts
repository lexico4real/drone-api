import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, Max, Min } from 'class-validator';
import { Model, State } from '../enums';
import { CreateDroneDto } from './create-drone.dto';

export class UpdateDroneDto extends PartialType(CreateDroneDto) {
  @IsEnum(Model, {
    message:
      'Model is not valid. Choose any of: LIGHT_WEIGHT, MIDDLE_WEIGHT, CRUISER_WEIGHT, HEAVY_WEIGHT',
  })
  model: Model;

  @Min(0)
  @Max(100, { message: 'Battery capacity cannot be more than 100%' })
  battery_capacity: number;

  @Min(0)
  @Max(500, { message: 'Weight limit cannot be more than 500kg' })
  weight_limit: number;

  @IsEnum(State, {
    message:
      'State is not valid. Choose any of: IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING',
  })
  state: State;
}
