import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DronesService } from './drones.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { Drone } from './entities/drone.entity';

@Controller('drones')
export class DronesController {
  constructor(private readonly dronesService: DronesService) {}

  @Post()
  createDrone(@Body() createDroneDto: CreateDroneDto) {
    return this.dronesService.createDrone(createDroneDto);
  }

  @Get()
  async getAllDrones(): Promise<Drone[]> {
    return await this.dronesService.getAllDrones();
  }

  @Get('/:id')
  getDroneById(@Param('id') id: string): Promise<Drone> {
    return this.dronesService.getDroneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDroneDto: UpdateDroneDto,
  ): Promise<Drone> {
    return await this.dronesService.updateDrone(id, updateDroneDto);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void> {
    return await this.dronesService.deleteDroneById(id);
  }
}
