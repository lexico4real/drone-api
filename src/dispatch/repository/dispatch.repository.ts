import { Medication } from './../../medications/entities/medication.entity';
import { CreateDispatchDto } from './../dto/create-dispatch.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Dispatch } from '../entities/dispatch.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Dispatch)
export class DispatchRepository extends Repository<Dispatch> {
  async findByMedicationId(medicationId: string): Promise<Dispatch[]> {
    const found = await this.createQueryBuilder('dispatch')
      .innerJoinAndSelect('dispatch.medications', 'medication')
      .where('medication.id = :medicationId', { medicationId })
      .innerJoinAndSelect('dispatch.drone', 'drone')
      .getMany();
    try {
      if (!found) {
        throw new NotFoundException(
          `Dispatch with medication id ${medicationId} not found`,
        );
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return found;
  }

  async findByDroneId(droneId: string): Promise<Dispatch[]> {
    return await this.createQueryBuilder('dispatch')
      .innerJoinAndSelect('dispatch.drone', 'drone')
      .where('drone.serial_number = :droneId', { droneId })
      .innerJoinAndSelect('dispatch.medications', 'medication')
      .getMany();
  }

  async deleteDispatch(id: string): Promise<void> {
    await this.delete(id);
  }
}
