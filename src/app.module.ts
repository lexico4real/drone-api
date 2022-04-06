import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesModule } from './drones/drones.module';
import { MedicationsModule } from './medications/medications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchModule } from './dispatch/dispatch.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DronesModule,
    MedicationsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'musala-drone-api',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DispatchModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
