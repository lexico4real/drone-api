import { IsBoolean, IsUUID } from 'class-validator';

export class CreateDispatchDto {
  description: string;

  @IsUUID()
  drone_id: string;

  @IsUUID()
  medication: string;

  @IsBoolean()
  is_completed: boolean;
}
