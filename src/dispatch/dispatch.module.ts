import { DroneRepository } from './../drones/repositories/drone.repository';
import { MedicationRepository } from './../medications/repositories/medication.repository';
import { DispatchRepository } from './repository/dispatch.repository';
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
    ]),
  ],
  controllers: [DispatchController],
  providers: [DispatchService],
})
export class DispatchModule {}
