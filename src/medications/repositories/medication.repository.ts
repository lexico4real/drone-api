import { CreateMedicationDto } from './../dto/create-medication.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Medication } from '../entities/medication.entity';

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
  async deleteMedicationById(id: string): Promise<void> {
    await this.delete(id);
  }
}
