import { DispatchRepository } from './repository/dispatch.repository';
import { Module } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DispatchRepository])],
  controllers: [DispatchController],
  providers: [DispatchService],
})
export class DispatchModule {}
