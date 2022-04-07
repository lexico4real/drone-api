import { Drone } from '../../drones/entities/drone.entity';
import { CreateMedicationDto } from '../../medications/dto/create-medication.dto';

export class CreateDispatchHistoryDto {
  description: string;

  drone: Drone;

  medications: CreateMedicationDto[];

  medicationIds: string[];
}
