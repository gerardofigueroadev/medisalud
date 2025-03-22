import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FacturasService } from './factura.service';
import { Factura } from './factura.entity';

@Controller('facturas')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Get()
  async getAll(): Promise<Factura[]> {
    return this.facturasService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Factura> {
    return this.facturasService.findOne(id);
  }
}
