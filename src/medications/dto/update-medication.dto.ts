import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicationDto } from './create-medication.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicationDto extends PartialType(CreateMedicationDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  image: string;
}
