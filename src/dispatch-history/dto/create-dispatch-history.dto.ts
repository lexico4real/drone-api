import { Drone } from '../../drones/entities/drone.entity';
import { CreateMedicationDto } from '../../medications/dto/create-medication.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDispatchHistoryDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  drone: Drone;

  @ApiProperty()
  medications: CreateMedicationDto[];

  @ApiProperty()
  medicationIds: string[];
}
