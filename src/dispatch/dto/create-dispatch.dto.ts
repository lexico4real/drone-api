import { CreateMedicationDto } from './../../medications/dto/create-medication.dto';
import { Drone } from './../../drones/entities/drone.entity';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDispatchDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsUUID()
  drone: Drone;

  @ApiProperty()
  @IsNotEmpty()
  medications: CreateMedicationDto[];

  @ApiProperty()
  medicationIds: string[];

  // @IsBoolean()
  // isCompleted: boolean;
}
