import { CreateMedicationDto } from './../dto/create-medication.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Medication } from '../entities/medication.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Medication)
export class MedicationRepository extends Repository<Medication> {
  async createMedication(
    createMedicationDto: CreateMedicationDto,
  ): Promise<Medication> {
    const { name, weight, code, image } = createMedicationDto;
    const medication = this.create({
      name,
      weight,
      code,
      image,
    });
    await this.save(medication);
    return medication;
  }
  async getAllMedications(): Promise<Medication[]> {
    return await this.find();
  }

  async getMedicationById(id: string): Promise<Medication> {
    let found: Medication | PromiseLike<Medication>;
    try {
      found = await this.findOne(id);
      if (!found) {
        throw new NotFoundException(`Medication with id ${id} not found`);
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return found;
  }
}
