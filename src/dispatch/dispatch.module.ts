import { DispatchHistoryRepository } from './../dispatch-history/repositories/dispatch-history.repository';
import { DroneRepository } from './../drones/repositories/drone.repository';
import { MedicationRepository } from './../medications/repositories/medication.repository';
import { DispatchRepository } from './repositories/dispatch.repository';
import { Module } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DispatchRepository,
      MedicationRepository,
      DroneRepository,
      DispatchHistoryRepository,
    ]),
  ],
  controllers: [DispatchController],
  providers: [DispatchService],
})
export class DispatchModule {}
