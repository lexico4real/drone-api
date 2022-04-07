import { PartialType } from '@nestjs/mapped-types';
import { CreateDispatchHistoryDto } from './create-dispatch-history.dto';

export class UpdateDispatchHistoryDto extends PartialType(
  CreateDispatchHistoryDto,
) {}
