import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesModule } from './drones/drones.module';
import { MedicationsModule } from './medications/medications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchModule } from './dispatch/dispatch.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
