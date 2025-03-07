import { Controller, Post, Body } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './factura.dto';
import { Factura } from './factura.entity';

@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  async createFactura(@Body() dto: CreateFacturaDto): Promise<Factura> {
    return this.facturaService.createFactura(dto);
  }
}
