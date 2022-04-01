import { Medication } from './entities/medication.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Controller('medications')
export class MedicationsController {
  constructor(private medicationsService: MedicationsService) {}

  @Post()
  async createMedication(
    @Body() createMedicationDto: CreateMedicationDto,
  ): Promise<Medication> {
    return this.medicationsService.createMedication(createMedicationDto);
  }

  @Get()
  async getAllMedications(): Promise<Medication[]> {
    return await this.medicationsService.getAllMedications();
  }

  @Get('/:id')
  async getMedicationById(@Param('id') id: string): Promise<Medication> {
    return await this.medicationsService.getMedicationById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ): Promise<Medication> {
    return this.medicationsService.updateMedication(id, updateMedicationDto);
  }

  @Delete(':id')
  async deleteMedicationById(@Param('id') id: string): Promise<void> {
    return await this.medicationsService.deleteMedicationById(id);
  }
}
