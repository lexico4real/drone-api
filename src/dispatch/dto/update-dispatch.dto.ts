import { PartialType } from '@nestjs/mapped-types';
import { Drone } from 'src/drones/entities/drone.entity';
import { CreateMedicationDto } from 'src/medications/dto/create-medication.dto';
import { CreateDispatchDto } from './create-dispatch.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDispatchDto extends PartialType(CreateDispatchDto) {
  @ApiProperty()
  description: string;

  @ApiProperty()
  drone: Drone;

  @ApiProperty()
  medications: CreateMedicationDto[];

  @ApiProperty()
  medicationIds: string[];
}
