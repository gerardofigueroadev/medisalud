import { Controller, Post, Body, Get } from '@nestjs/common';
import { InsuredsService } from './insureds.service';
import { CreateInsuredDto } from './create_insured.dto';
import { Insured } from './insureds.model';

@Controller('insureds')
export class InsuredsController {
    constructor(private readonly insuredsService: InsuredsService) { }

    @Post()
    async create(@Body() createInsuredDto: CreateInsuredDto) {
        return this.insuredsService.createInsured(createInsuredDto);
    }

    @Get()
    async findAll(): Promise<Insured[]> {
        return await this.insuredsService.findAll();
    }

}
