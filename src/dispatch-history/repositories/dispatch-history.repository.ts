import { EntityRepository, Repository } from 'typeorm';
import { DispatchHistory } from '../entities/dispatch-history.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(DispatchHistory)
export class DispatchHistoryRepository extends Repository<DispatchHistory> {
  async findByMedicationId(medicationId: string): Promise<DispatchHistory[]> {
    const found = await this.createQueryBuilder('dispatchHistory')
      .innerJoinAndSelect('dispatchHistory.medications', 'medication')
      .where('medication.id = :medicationId', { medicationId })
      .innerJoinAndSelect('dispatchHistory.drone', 'drone')
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

  async findByDroneId(droneId: string): Promise<DispatchHistory[]> {
    return await this.createQueryBuilder('dispatchHisotry')
      .innerJoinAndSelect('dispatchHistory.drone', 'drone')
      .where('drone.serialNumber = :droneId', { droneId })
      .innerJoinAndSelect('dispatchHistory.medications', 'medication')
      .getMany();
  }
}
