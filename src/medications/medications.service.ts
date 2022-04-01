import { Medication } from './entities/medication.entity';
import { MedicationRepository } from './repositories/medication.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(MedicationRepository)
    private medicationRepository: MedicationRepository,
  ) {}
  async createMedication(
    createMedicationDto: CreateMedicationDto,
  ): Promise<Medication> {
    return this.medicationRepository.createMedication(createMedicationDto);
  }

  async getAllMedications(): Promise<Medication[]> {
    return this.medicationRepository.find();
  }

  async getMedicationById(id: string): Promise<Medication> {
    let found: Medication | PromiseLike<Medication>;
    try {
      found = await this.medicationRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Medication with id ${id} not found`);
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    return found;
  }

  async updateMedication(
    id: string,
    updateMedicationDto: UpdateMedicationDto,
  ): Promise<Medication> {
    const found = await this.getMedicationById(id);
    const { name, weight, code, image } = updateMedicationDto;
    found.name = name;
    found.weight = weight;
    found.code = code;
    found.image = image;
    await this.medicationRepository.save(found);
    return found;
  }

  async deleteMedicationById(id: string): Promise<void> {
    const found = await this.getMedicationById(id);
    const result = await this.medicationRepository.delete(found.id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medication with id ${id} not found`);
    } else {
      return;
    }
  }
}
