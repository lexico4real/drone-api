import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { Drone } from './entities/drone.entity';
import { DroneRepository } from './repositories/drone.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DronesService {
  private readonly logger = new Logger(DronesService.name);
  constructor(
    @InjectRepository(DroneRepository)
    private droneRepository: DroneRepository,
  ) {}
  createDrone(createDroneDto: CreateDroneDto) {
    return this.droneRepository.createDrone(createDroneDto);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.log('Cron job executed');
  }

  async getAllDrones(): Promise<Drone[]> {
    return this.droneRepository.getAllDrones();
  }

  async getDroneById(id: string): Promise<Drone> {
    let found: Drone | PromiseLike<Drone>;
    try {
      found = await this.droneRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Drone with serial number ${id} not found`);
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    return found;
  }

  async updateDrone(
    id: string,
    updateDroneDto: UpdateDroneDto,
  ): Promise<Drone> {
    const drone = await this.getDroneById(id);
    const { model, battery_capacity, state, weight_limit } = updateDroneDto;
    drone.model = model;
    drone.battery_capacity = Number(battery_capacity);
    drone.state = state;
    drone.weight_limit = Number(weight_limit);
    await this.droneRepository.save(drone);
    return drone;
  }

  async deleteDroneById(id: string): Promise<void> {
    const found = await this.getDroneById(id);
    const result = await this.droneRepository.delete(found.serial_number);
    if (result.affected === 0) {
      throw new NotFoundException(`Drone with serial number ${id} not found`);
    } else {
      return;
    }
  }
}
