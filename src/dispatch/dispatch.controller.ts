import { Dispatch } from 'src/dispatch/entities/dispatch.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';

@Controller('dispatch')
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Post()
  async createDispatch(
    @Body() createDispatchDto: CreateDispatchDto,
  ): Promise<Dispatch> {
    return await this.dispatchService.createDispatch(createDispatchDto);
  }

  @Get()
  async getAllDispatches() {
    return await this.dispatchService.getAllDispatches();
  }

  @Get(':id')
  async getDispatchById(@Param('id') id: string) {
    return await this.dispatchService.getDispatchById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDispatchDto: UpdateDispatchDto,
  ) {
    return this.dispatchService.update(+id, updateDispatchDto);
  }

  @Delete(':id')
  async deleteDispatch(@Param('id') id: string): Promise<void> {
    return await this.dispatchService.deleteDispatch(id);
  }
}
