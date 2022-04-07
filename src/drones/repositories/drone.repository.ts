import { CreateDroneDto } from './../dto/create-drone.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Drone } from '../entities/drone.entity';
import { State } from '../enums';

@EntityRepository(Drone)
export class DroneRepository extends Repository<Drone> {
  async createDrone(createDroneDto: CreateDroneDto): Promise<Drone> {
    const { model, batteryCapacity, weightLimit } = createDroneDto;
    const drone = this.create({
      model,
      state: State.IDLE,
      batteryCapacity: Number(batteryCapacity),
      weightLimit: Number(weightLimit),
    });
    await this.save(drone);
    return drone;
  }

  async getAllDrones(): Promise<Drone[]> {
    return this.find();
  }
}
