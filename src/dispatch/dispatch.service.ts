import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';
import { Dispatch } from './entities/dispatch.entity';
import { DispatchRepository } from './repository/dispatch.repository';

@Injectable()
export class DispatchService {
  constructor(
    @InjectRepository(DispatchRepository)
    private dispatchRepository: DispatchRepository,
  ) {}
  async createDispatch(
    createDispatchDto: CreateDispatchDto,
  ): Promise<Dispatch> {
    return await this.dispatchRepository.createDispatch(createDispatchDto);
  }

  async getAllDispatches(): Promise<Dispatch[]> {
    return await this.dispatchRepository.find();
  }

  async getDispatchById(id: string): Promise<Dispatch> {
    let found: Dispatch | PromiseLike<Dispatch>;
    try {
      found = await this.dispatchRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Dispatch with id ${id} not found`);
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return found;
  }

  update(id: number, updateDispatchDto: UpdateDispatchDto) {
    return `This action updates a #${id} dispatch`;
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
