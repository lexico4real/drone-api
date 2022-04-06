import { UpdateDroneDto } from './../drones/dto/update-drone.dto';
import { Drone } from './../drones/entities/drone.entity';
import { DroneRepository } from './../drones/repositories/drone.repository';
import { Medication } from './../medications/entities/medication.entity';
import { MedicationRepository } from './../medications/repositories/medication.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';
import { Dispatch } from './entities/dispatch.entity';
import { DispatchRepository } from './repository/dispatch.repository';
import { In } from 'typeorm';
import { State } from 'src/drones/enums';

@Injectable()
export class DispatchService {
  constructor(
    @InjectRepository(DispatchRepository)
    private dispatchRepository: DispatchRepository,
    @InjectRepository(MedicationRepository)
    private medicationRepository: MedicationRepository,
    @InjectRepository(DroneRepository)
    private droneRepository: DroneRepository,
  ) {}

  async findByMedicationId(medicationId: string): Promise<Dispatch[]> {
    return await this.dispatchRepository.findByMedicationId(medicationId);
  }

  async findByDroneId(droneId: string): Promise<Dispatch[]> {
    return await this.dispatchRepository.findByDroneId(droneId);
  }

  async getDroneById(id: string): Promise<Drone> {
    let found: Drone | PromiseLike<Drone>;
    try {
      found = await this.droneRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Drone with id ${id} not found`);
      } else {
        return found;
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getMedicationByIds(ids: Array<string>): Promise<Medication[]> {
    let found: Medication[] | PromiseLike<Medication>;
    try {
      found = await this.medicationRepository.find({
        where: {
          id: In([...ids]),
        },
      });
      if (!found) {
        throw new NotFoundException(`Medication with id ${ids} not found`);
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return found;
  }

  async updateDroneState(
    id: string,
    updateDroneDto: UpdateDroneDto,
  ): Promise<Drone> {
    const found = await this.getDroneById(id);
    found.batteryCapacity = updateDroneDto.batteryCapacity;
    found.weightLimit = updateDroneDto.weightLimit;
    found.state = updateDroneDto.state;
    try {
      await this.droneRepository.save(found);
      return found;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateDroneStateWithDispatchId(
    id: string,
    updateDroneDto: UpdateDroneDto,
  ): Promise<Dispatch> {
    const found = await this.getDispatchById(id);
    found.drone.batteryCapacity = updateDroneDto.batteryCapacity;
    found.drone.weightLimit = updateDroneDto.weightLimit;
    found.drone.state = updateDroneDto.state;
    try {
      await this.droneRepository.save(found.drone);
      return found;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createDispatch(
    createDispatchDto: CreateDispatchDto,
  ): Promise<Dispatch> {
    const { description, drone, medications } = createDispatchDto;

    const dispatch = new Dispatch();
    dispatch.description = description;
    dispatch.drone = drone;
    dispatch.medications = await this.getMedicationByIds(
      medications as unknown as Array<string>,
    );
    let weightSum = 0;
    let medicationElement: { weight: any };
    const medicationName = [];
    const medicationWeight = [];
    for (medicationElement of dispatch.medications) {
      medicationName.push(medicationElement['name']);
      medicationWeight.push(medicationElement['weight']);
      weightSum += Number(medicationElement.weight);
    }

    const droneObject = await this.getDroneById(
      dispatch.drone as unknown as string,
    );

    const result = await this.getDroneById(droneObject.serialNumber);

    if (Number(result.weightLimit) < weightSum) {
      throw new NotFoundException(
        `Drone weight ${
          result.weightLimit
        } gram is not enough to carry medications: ${medicationName.join(
          ', ',
        )} with weight: ${medicationWeight.join(' gram, ')} gram respectively`,
      );
    }

    if (droneObject.batteryCapacity <= 25) {
      throw new NotFoundException(
        `Drone battery capacity ${
          droneObject.batteryCapacity
        }% is not enough to carry medications: ${medicationName.join(
          ', ',
        )} with weight: ${medicationWeight.join(' gram, ')} gram respectively`,
      );
    }

    const updateDoneState = await this.updateDroneState(
      dispatch.drone as unknown as string,
      {
        batteryCapacity: droneObject.batteryCapacity,
        weightLimit: droneObject.weightLimit,
        model: droneObject.model,
        state: State.LOADING,
      },
    );

    await this.droneRepository.save(updateDoneState);

    try {
      await this.dispatchRepository.save(dispatch);
      return dispatch;
    } catch (error) {
      if (error.code === '23505') {
        throw new NotFoundException('Drone already assigned to medication');
      } else if (error.code === '23503') {
        throw new NotFoundException('Drone or medication not found');
      }
    }
  }

  async getAllDispatches(): Promise<Dispatch[]> {
    return await this.dispatchRepository.find({
      relations: ['drone', 'medications'],
    });
  }

  async getDispatchById(id: string): Promise<Dispatch> {
    let found: Dispatch | PromiseLike<Dispatch>;
    try {
      found = await this.dispatchRepository.findOne(id, {
        relations: ['drone', 'medications'],
      });
      if (!found) {
        throw new NotFoundException(`Dispatch with id ${id} not found`);
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return found;
  }

  async updateDispatch(
    id: string,
    updateDispatchDto: UpdateDispatchDto,
  ): Promise<Dispatch> {
    let found: Dispatch | PromiseLike<Dispatch>;
    try {
      found = await this.getDispatchById(id);
      if (!found) {
        throw new NotFoundException(`Dispatch with id ${id} not found`);
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    const { description, drone, medications } = updateDispatchDto;

    found.description = description;
    found.drone = drone;
    found.medications = await this.getMedicationByIds(
      medications as unknown as Array<string>,
    );

    try {
      await this.dispatchRepository.save(found);
      return found;
    } catch (error) {
      if (error.code === '23505') {
        throw new NotFoundException('Drone already assigned to medication');
      } else if (error.code === '23503') {
        throw new NotFoundException('Drone or medication not found');
      }
    }
  }

  async deleteDispatch(id: string): Promise<void> {
    const found = await this.getDispatchById(id);
    const result = await this.dispatchRepository.delete(found.id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dispatch with id ${id} not found`);
    } else {
      return;
    }
  }
}
