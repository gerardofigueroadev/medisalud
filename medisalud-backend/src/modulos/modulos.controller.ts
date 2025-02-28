import { Controller, Get } from '@nestjs/common';
import { ModuloService } from './modulo.service';

@Controller('modulos')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Get()
  async getAllModulos() {
    return this.moduloService.getAllModulos();
  }
}