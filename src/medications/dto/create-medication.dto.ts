import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9.\-_]+$/, {
    message:
      'Name can only contain alphanumeric characters, hyphen, underscore and/or spaces',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/[A-Z]{4,}/, {
    message:
      'Code must be at least 4 characters long and contain only uppercase letters',
  })
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/(https?:\/\/.*\.(?:png|jpg|gif))/i, {
    message: 'Image URL is not valid',
  })
  image: string;
}
