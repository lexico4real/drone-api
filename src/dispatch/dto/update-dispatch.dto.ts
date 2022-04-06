import { PartialType } from '@nestjs/mapped-types';
import { Drone } from 'src/drones/entities/drone.entity';
import { CreateMedicationDto } from 'src/medications/dto/create-medication.dto';
import { CreateDispatchDto } from './create-dispatch.dto';

export class UpdateDispatchDto extends PartialType(CreateDispatchDto) {
  description: string;

  drone: Drone;

  medications: CreateMedicationDto[];

  medicationIds: string[];
}
