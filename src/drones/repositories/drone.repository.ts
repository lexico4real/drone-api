import { NotFoundException } from '@nestjs/common';
import { CreateDroneDto } from './../dto/create-drone.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Drone } from '../entities/drone.entity';
import { State } from '../enums';
import { UpdateDroneDto } from '../dto/update-drone.dto';

@EntityRepository(Drone)
export class DroneRepository extends Repository<Drone> {
  async createDrone(createDroneDto: CreateDroneDto): Promise<Drone> {
    const { model, battery_capacity, weight_limit } = createDroneDto;
    const drone = this.create({
      model,
      state: State.IDLE,
      battery_capacity: Number(battery_capacity),
      weight_limit: Number(weight_limit),
    });
    await this.save(drone);
    return drone;
  }

  async getAllDrones(): Promise<Drone[]> {
    return this.find();
  }

  // async updateDrone(
  //   id: string,
  //   updateDroneDto: UpdateDroneDto,
  // ): Promise<Drone> {
  //   const { model, battery_capacity, state, weight_limit } = updateDroneDto;
  //   const drone = await this.findOne(id);
  //   if (!drone) {
  //     throw new NotFoundException(`Drone with serial number ${id} not found`);
  //   }
  //   drone.model = model;
  //   drone.battery_capacity = Number(battery_capacity);
  //   drone.state = state;
  //   drone.weight_limit = Number(weight_limit);
  //   await this.save(drone);
  //   return drone;
  // }

  async deleteDrone(id: string): Promise<void> {
    await this.delete(id);
  }
}
