import { Medication } from './../../medications/entities/medication.entity';
import { CreateDispatchDto } from './../dto/create-dispatch.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Dispatch } from '../entities/dispatch.entity';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@EntityRepository(Dispatch)
export class DispatchRepository extends Repository<Dispatch> {
  // async findByMedicationId(medicationId: string): Promise<Dispatch[]> {
  //   return await this.createQueryBuilder('dispatch')
  //     .innerJoinAndSelect('dispatch.medication', 'medication')
  //     .where('medication.id = :medicationId', { medicationId })
  //     .getMany();
  // }

  // async findByDroneId(droneId: string): Promise<Dispatch[]> {
  //   return await this.createQueryBuilder('dispatch')
  //     .innerJoinAndSelect('dispatch.drone', 'drone')
  //     .where('drone.id = :droneId', { droneId })
  //     .getMany();
  // }

  // async findByMedicationIdAndDroneId(
  //   medicationId: string,
  //   droneId: string,
  // ): Promise<Dispatch> {
  //   return await this.createQueryBuilder('dispatch')
  //     .innerJoinAndSelect('dispatch.medication', 'medication')
  //     .innerJoinAndSelect('dispatch.drone', 'drone')
  //     .where('medication.id = :medicationId', { medicationId })
  //     .andWhere('drone.id = :droneId', { droneId })
  //     .getOne();
  // }

  async createDispatch(
    createDispatchDto: CreateDispatchDto,
  ): Promise<Dispatch> {
    const { description, drone, medications } = createDispatchDto;

    const dispatch = new Dispatch();
    dispatch.description = description;
    dispatch.drone = drone;
    dispatch.medications = medications as unknown as Medication[];

    console.log(await this.save(dispatch));

    try {
      await this.save(dispatch);
      return dispatch;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Drone already assigned to medication');
      } else if (error.code === '23503') {
        throw new NotFoundException('Drone or medication not found');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteDispatch(id: string): Promise<void> {
    await this.delete(id);
  }
}
