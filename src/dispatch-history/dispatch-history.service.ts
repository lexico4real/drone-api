import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDroneDto } from 'src/drones/dto/update-drone.dto';
import { Drone } from 'src/drones/entities/drone.entity';
import { DroneRepository } from 'src/drones/repositories/drone.repository';
import { Medication } from 'src/medications/entities/medication.entity';
import { MedicationRepository } from 'src/medications/repositories/medication.repository';
import { In } from 'typeorm';
import { State } from '../drones/enums';
import { CreateDispatchHistoryDto } from './dto/create-dispatch-history.dto';
import { DispatchHistory } from './entities/dispatch-history.entity';
import { DispatchHistoryRepository } from './repositories/dispatch-history.repository';

@Injectable()
export class DispatchHistoryService {
  constructor(
    @InjectRepository(DispatchHistoryRepository)
    private dispatchHistoryRepository: DispatchHistoryRepository,
    @InjectRepository(MedicationRepository)
    private medicationRepository: MedicationRepository,
    @InjectRepository(DroneRepository)
    private droneRepository: DroneRepository,
  ) {}

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
  async getDispatchHistoryById(id: string): Promise<DispatchHistory> {
    let found: DispatchHistory | PromiseLike<DispatchHistory>;
    try {
      found = await this.dispatchHistoryRepository.findOne(id, {
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
  async updateDroneStateWithDispatchId(
    id: string,
    updateDroneDto: UpdateDroneDto,
  ): Promise<DispatchHistory> {
    const found = await this.getDispatchHistoryById(id);
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

  async createDispatchHistory(
    createDispatchHistoryDto: CreateDispatchHistoryDto,
  ): Promise<DispatchHistory> {
    const { description, drone, medications } = createDispatchHistoryDto;

    const dispatchHistory = new DispatchHistory();
    dispatchHistory.description = description;
    dispatchHistory.drone = drone;
    dispatchHistory.medications = await this.getMedicationByIds(
      medications as unknown as Array<string>,
    );
    let weightSum = 0;
    let medicationElement: { weight: any };
    const medicationName = [];
    const medicationWeight = [];
    for (medicationElement of dispatchHistory.medications) {
      medicationName.push(medicationElement['name']);
      medicationWeight.push(medicationElement['weight']);
      weightSum += Number(medicationElement.weight);
    }

    const droneObject = await this.getDroneById(
      dispatchHistory.drone as unknown as string,
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
      dispatchHistory.drone as unknown as string,
      {
        batteryCapacity: droneObject.batteryCapacity,
        weightLimit: droneObject.weightLimit,
        model: droneObject.model,
        state: State.LOADING,
      },
    );

    await this.droneRepository.save(updateDoneState);
    dispatchHistory.drone = updateDoneState;
    try {
      await this.dispatchHistoryRepository.save(dispatchHistory);
      return dispatchHistory;
    } catch (error) {
      if (error.code === '23505') {
        throw new NotFoundException('Drone already assigned to medication');
      } else if (error.code === '23503') {
        throw new NotFoundException('Drone or medication not found');
      }
    }
  }

  // findAll() {
  //   return `This action returns all dispatchHistory`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} dispatchHistory`;
  // }

  // update(id: number, updateDispatchHistoryDto: UpdateDispatchHistoryDto) {
  //   return `This action updates a #${id} dispatchHistory`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} dispatchHistory`;
  // }
}
