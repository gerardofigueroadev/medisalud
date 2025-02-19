import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PlansService } from './plans.service';
import { Plans } from './plans.model';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  async getAll(): Promise<Plans[]> {
    return this.plansService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Plans | null> {
    return this.plansService.findOne(id);
  }

  @Post()
  async create(@Body() plan: Partial<Plans>): Promise<Plans> {
    return this.plansService.create(plan);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() plan: Partial<Plans>): Promise<Plans | null> {
    return this.plansService.update(id, plan);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.plansService.delete(id);
  }
}