import { UpdateDroneDto } from './../drones/dto/update-drone.dto';
import { Dispatch } from 'src/dispatch/entities/dispatch.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';

@Controller('dispatch')
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Get('/withmedication/:id')
  async findByMedicationId(@Param('id') id: string): Promise<Dispatch[]> {
    return await this.dispatchService.findByMedicationId(id);
  }

  @Get('/withdrone/:id')
  async findByDroneId(@Param('id') id: string): Promise<Dispatch[]> {
    return await this.dispatchService.findByDroneId(id);
  }

  @Post()
  async createDispatch(
    @Body() createDispatchDto: CreateDispatchDto,
  ): Promise<Dispatch> {
    return await this.dispatchService.createDispatch(createDispatchDto);
  }

  @Get()
  async getAllDispatches() {
    return await this.dispatchService.getAllDispatches();
  }

  @Get(':id')
  async getDispatchById(@Param('id') id: string) {
    return await this.dispatchService.getDispatchById(id);
  }

  @Patch('/dronestate/:id')
  async updateDroneStateWithDispatchId(
    @Param('id') id: string,
    @Body() updateDroneDto: UpdateDroneDto,
  ): Promise<Dispatch> {
    return await this.dispatchService.updateDroneStateWithDispatchId(
      id,
      updateDroneDto,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDispatchDto: UpdateDispatchDto,
  ): Promise<Dispatch> {
    return await this.dispatchService.updateDispatch(id, updateDispatchDto);
  }

  @Delete(':id')
  async deleteDispatch(@Param('id') id: string): Promise<void> {
    return await this.dispatchService.deleteDispatch(id);
  }
}
