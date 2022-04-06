import { CreateMedicationDto } from './../../medications/dto/create-medication.dto';
import { Drone } from './../../drones/entities/drone.entity';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDispatchDto {
  @IsNotEmpty()
  description: string;

  @IsUUID()
  drone: Drone;

  @IsNotEmpty()
  medications: CreateMedicationDto[];

  medicationIds: string[];

  // @IsBoolean()
  // isCompleted: boolean;
}
