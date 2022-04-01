import { IsNotEmpty, Matches } from 'class-validator';

export class CreateMedicationDto {
  @IsNotEmpty()
  @Matches(/[a-zA-Z0-9_-]{2,20}/)
  name: string;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  dispatch: string[];
}
