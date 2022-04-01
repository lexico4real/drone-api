import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';
import { DroneRepository } from './repositories/drone.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DroneRepository])],
  controllers: [DronesController],
  providers: [DronesService],
})
export class DronesModule {}
