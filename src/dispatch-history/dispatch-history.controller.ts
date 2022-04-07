import { Controller } from '@nestjs/common';
import { DispatchHistoryService } from './dispatch-history.service';

@Controller('dispatch-history')
export class DispatchHistoryController {
  constructor(
    private readonly dispatchHistoryService: DispatchHistoryService,
  ) {}
}
