import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/[a-zA-Z0-9_-]{2,20}/)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  image: string;
}
