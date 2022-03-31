import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesModule } from './drones/drones.module';
import { MedicationsModule } from './medications/medications.module';

@Module({
  imports: [DronesModule, MedicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
