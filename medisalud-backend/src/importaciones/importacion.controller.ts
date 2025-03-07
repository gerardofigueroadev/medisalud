import { Body, Controller, Get, Post } from '@nestjs/common';
import { ImportacionService } from './importacion.service';
import { ImportacionDto } from './importacion.dto';
import { CreateImportacionDto } from './create-importacion.dto';
import { Importacion } from './importacion.entity';

@Controller('importaciones')
export class ImportacionController {
  constructor(private readonly importacionService: ImportacionService) {}

  @Get()
  async getImportaciones(): Promise<ImportacionDto[]> {
    return this.importacionService.getImportaciones();
  }

  @Post()
  async createImportacion(@Body() dto: CreateImportacionDto): Promise<Importacion> {
    return this.importacionService.createImportacion(dto);
  }
}
