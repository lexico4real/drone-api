import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { MedicationRepository } from './repositories/medication.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MedicationRepository])],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
