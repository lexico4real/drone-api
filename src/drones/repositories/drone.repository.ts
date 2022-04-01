import { CreateDroneDto } from './../dto/create-drone.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Drone } from '../entities/drone.entity';
import { State } from '../enums';

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

  async deleteDrone(id: string): Promise<void> {
    await this.delete(id);
  }
}
