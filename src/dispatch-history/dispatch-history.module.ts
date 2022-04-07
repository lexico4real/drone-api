import { DroneRepository } from './../drones/repositories/drone.repository';
import { MedicationRepository } from './../medications/repositories/medication.repository';
import { DispatchHistoryRepository } from './repositories/dispatch-history.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DispatchHistoryService } from './dispatch-history.service';
import { DispatchHistoryController } from './dispatch-history.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DispatchHistoryRepository,
      MedicationRepository,
      DroneRepository,
    ]),
  ],
  controllers: [DispatchHistoryController],
  providers: [DispatchHistoryService],
})
export class DispatchHistoryModule {}
